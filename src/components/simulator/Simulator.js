import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SimulatorInput from './SimulatorInput/SimulatorInput';
import SimulatorGraphs from './SimulatorGraphs/SimulatorGraphs';
import { doHamming } from '../../functions/encode';
import sampleMsg from '../../functions/sampleMsg';
import { doBPSK } from '../../functions/modulate';

const styles = (theme) => ({
  appHeader: {
    marginTop: theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit * 3,
  },
});

class Simulator extends Component {
  state = {
    freq: 2048,
    bits: '1010',
    hammed: '',
    enc: '',
    currentGraph: 0,
    graphs: null,
  };

  saveGraphs() {
    try {
      this.setState({ graphs: this.getGraphs() });
    } catch (error) {
      console.log(error);
      this.setState({ graphs: null });
    }
  }

  componentWillMount() {
    this.saveGraphs();
  }

  switchGraph = (name) => {
    this.setState({ currentGraph: name });
  };

  updateSimulator = (key, val) => {
    this.setState({ [key]: val }, () => this.saveGraphs());
  };

  getMsgGraphs() {
    const msg = sampleMsg(this.state.bits, this.state.freq);

    return {
      t: {
        x: msg.tx,
        y: msg.ty,
        tit: 'Input signal time response',
      },
      f: {
        x: msg.fx,
        y: msg.fy,
        tit: 'Input signal frequency response',
        xmas: 128,
      },
    };
  }

  getEncGraphs() {
    if (this.state.enc !== 'hamm') {
      throw new Error('Invalid encoding type given.');
    }

    const enc = doHamming(this.state.bits, this.state.freq);

    // Save Hamming-encoded signal to state for use for other functions
    this.setState({ hammed: enc.hammed });

    return {
      t: {
        x: enc.tx,
        y: enc.ty,
        tit: 'Encoded signal time response',
      },
      f: {
        x: enc.fx,
        y: enc.fy,
        tit: 'Encoded signal frequency response',
        xmas: 128,
      },
    };
  }

  getModGraphs() {
    const mod = doBPSK(this.state.hammed, this.state.freq);
  }

  getGraphs() {
    switch (this.state.currentGraph) {
      case 0:
        return this.getMsgGraphs();
      case 1:
        return this.getEncGraphs();
      case 2:
        return this.getModGraphs();
      default:
        throw new Error('Invalid current graph number.');
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid item md={10} xs={12}>
            <Typography variant="display1" className={classes.appHeader}>
              {'Simulator'}
            </Typography>
            <Grid container spacing={24} justify="center">
              <Grid item md={6} xs={12}>
                <SimulatorInput
                  update={this.updateSimulator}
                  switchGraph={this.switchGraph}
                  currentGraph={this.state.currentGraph}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {this.state.graphs ? (
                  <SimulatorGraphs
                    tGraph={this.state.graphs.t}
                    fGraph={this.state.graphs.f}
                  />
                ) : (
                  <div>Cannot plot graph.</div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Simulator.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Simulator);
