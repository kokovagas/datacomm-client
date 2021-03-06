import * as lab from 'datacomm-lab';

export const modBPSK = (inp) => {
  const carr = new lab.WaveSignal(lab.WaveSignalType.SINE, inp.length, 8);
  const bpsk = new lab.BPSK(inp, carr.signal);
  return bpsk.modulated;
};
