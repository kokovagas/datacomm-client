import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LabGroup.css';
import Button from './Button';

export default class LabGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    onGrpLaunch: PropTypes.func,
    selected: PropTypes.bool,
    animated: PropTypes.bool,
    // TODO: Tighten reqs
    inputs: PropTypes.array,
  };

  render() {
    return (
      <div className="specGrp">
        <div className="specGrpLabel">{this.props.title}</div>
        <div className="specGrpTrigger">
          <Button
            text={'<<'}
            style={{
              height: 20,
              width: 60,
              color: this.props.selected ? '#e00000' : null,
            }}
            selected={this.props.selected}
            animated={this.props.animated}
            onClick={(evt) => {
              if (this.props.onGrpLaunch) this.props.onGrpLaunch(evt);
            }}
          />
        </div>
        <div
          className={this.props.selected ? 'specGrpBox selected' : 'specGrpBox'}
        >
          {this.props.inputs
            ? this.props.inputs.map((x, i) => (
                <div className="specInput" key={i}>
                  <div className="specLabel">{x.label}</div>
                  {x.component}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
