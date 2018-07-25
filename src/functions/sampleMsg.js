import * as lab from 'datacomm-lab';
import getFRes from './graphing/getFRes';
import getXAxis from './graphing/getXAxis';

export default (bits, freq) => {
  // Compute time response
  // Get input bits
  const bi = new lab.Signal(4);
  bi.signal = bits.split('').map(parseFloat);

  // Sample bits by provided Fs
  const ins = new lab.Signal(freq);
  ins.signal = bi.sample(freq);

  const fres = getFRes(ins.signal);

  return {
    tx: getXAxis(freq),
    ty: ins.signal,
    fx: fres.fx,
    fy: fres.fy,
  };
};