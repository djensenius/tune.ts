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
      input: Input.MIDI,
    };
  }

  tonicize(newTonic: number): void {
    this.tonic = newTonic;
  }

  setOutput(newMode: Output): void {
    this.mode.output = newMode;
  }

  note(input: number, octave: number): number {
    let newvalue;

    if (this.mode.output === Output.Frequency) {
      newvalue = this.frequency(input, octave);
    } else if (this.mode.output === Output.Ratio) {
      newvalue = this.ratio(input, octave);
    } else if (this.mode.output === Output.MIDI) {
      newvalue = this.MIDI(input, octave);
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

  ratio(stepIn: number, octaveIn:number): number {
    if (this.mode.input === Input.MIDI) {
      this.stepIn += 60;
    }

    let octave = Math.floor(stepIn / this.scale.length);

    if (octaveIn) {
      octave += octaveIn;
    }

    const scaleDegree = stepIn % this.scale.length;
    let ratio = (2 ** octave) * this.scale[scaleDegree];
    ratio = Math.floor(ratio * 100000000000) / 100000000000;

    return ratio;
  }

  MIDI(stepIn: number, octaveIn: number): number {
    const newvalue = this.frequency(stepIn, octaveIn);
    let n = 69 + (12 * (Math.log(newvalue / 440) / Math.log(2)));
    n = Math.floor(n * 1000000000) / 1000000000;
    return n;
  }

  loadScale(name: TuningSystem): void {
    const freqs = System[name].frequencies;
    this.scale = [];
    for (let i = 0; i < freqs.length - 1; i += 1) {
      this.scale.push(freqs[i] / freqs[0]);
    }
  }

  public static search(letters: string): string[] {
    const possible = [];
    const keys = Object.keys(System);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key.toLowerCase().indexOf(letters.toLowerCase()) !== -1) {
        possible.push(key);
      }
    }
    return possible;
  }

  chord(midis: number[]): number[] {
    const output = [];
    for (let i = 0; i < midis.length; i += 1) {
      output.push(this.note(midis[i], 0));
    }
    return output;
  }
}
