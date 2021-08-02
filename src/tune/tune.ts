import { System, TuningSystem } from './systems';

export interface Tuning {
  name: string;
  description: string;
  frequencies: number[];
}

export enum Output {
  Frequency,
  Ratio,
  MIDI,
}

export enum Input {
  Step,
  MIDI,
}

export interface Mode {
  output: Output;
  input: Input;
}

export default class Tune {
  scale: number[];

  mode: Mode;

  tonic: number;

  stepIn: number;

  constructor() {
    this.tonic = 440;
    this.scale = [];
    this.stepIn = 0;
    this.mode = {
      output: Output.Frequency,
      input: Input.Step,
    };
    // console.log(System);
    // console.log(System['five_nineteen']);
  }

  tonicize(newTonic: number): void {
    this.tonic = newTonic;
  }

  note(input: number, octave: number): number {
    let newvalue;

    if (this.mode.output === Output.Frequency) {
      newvalue = this.frequency(input, octave);
    } else if (this.mode.output === Output.Ratio) {
      // newvalue = this.ratio(input, octave);
    } else if (this.mode.output === Output.MIDI) {
      // newvalue = this.MIDI(input, octave);
    } else {
      newvalue = this.frequency(input, octave);
    }
    return newvalue;
  }

  frequency(stepIn: number, octaveIn: number): number {
    if (this.mode.input === Input.MIDI) {
      this.stepIn += 60;
    }

    // what octave is our input
    let octave = Math.floor(stepIn / this.scale.length);

    if (octaveIn) {
      octave += octaveIn;
    }

    // which scale degree (0 - scale length) is our input
    let scaleDegree = stepIn % this.scale.length;

    while (scaleDegree < 0) {
      scaleDegree += this.scale.length;
    }

    let freq = this.tonic * this.scale[scaleDegree];

    freq *= ((2 ** octave));

    // truncate irrational numbers
    freq = Math.floor(freq * 100000000000) / 100000000000;
    return freq;
  }

  loadScale(name: TuningSystem): void {
    const freqs = System[name].frequencies;
    console.warn(freqs);
    this.scale = [];
    for (let i = 0; i < freqs.length - 1; i += 1) {
      this.scale.push(freqs[i] / freqs[0]);
    }
  }
}
