/* eslint-disable no-restricted-syntax */
import Tune from '../index';
import TuneJS from '../../contrib/tune';
import { System } from '../tune/systems';

describe('Tune', () => {
  it('should construct tune with default values', () => {
    const tune = new Tune();
    expect(tune.tonic).toBe(440);
  });

  it('should set new tonic', () => {
    const tune = new Tune();
    tune.tonicize(200);
    expect(tune.tonic).toBe(200);
  });
});

describe('Scales', () => {
  const tune = new Tune();
  const tunejs = new TuneJS();
  for (const [key, value] of Object.entries(System)) {
    it(`should match frequencies of for ${key}`, () => {
      tune.loadScale(key);
      tunejs.loadScale(value.name);
      expect(tune.scale).toEqual(tunejs.scale);
    });
  }
});

describe('Note', () => {
  const tune = new Tune();
  const tunejs = new TuneJS();
  const octaves = [-1, 0, 2];
  const notes = [-2, 2, 10];

  for (const [key, value] of Object.entries(System)) {
    for (let i = 0; i < octaves.length; i += 1) {
      for (let j = 0; j < notes.length; j += 1) {
        it(`should match frequencies of for ${key} octave: ${octaves[i]} note: ${notes[j]}`, () => {
          tune.loadScale(key);
          tunejs.loadScale(value.name);

          tunejs.mode.output = 'frequency';
          tune.setOutput(0);
          expect(tune.note(notes[j], octaves[i]).toFixed(5)).toEqual(tunejs.note(notes[j], octaves[i]).toFixed(5));

          tunejs.mode.output = 'ratio';
          tune.setOutput(1);
          expect(tune.note(notes[j], octaves[i]).toFixed(5)).toEqual(tunejs.note(notes[j], octaves[i]).toFixed(5));

          tunejs.mode.output = 'MIDI';
          tune.setOutput(2);
          expect(tune.note(notes[j], octaves[i]).toFixed(5)).toEqual(tunejs.note(notes[j], octaves[i]).toFixed(5));
        });
      }
    }
  }
});

describe('Search', () => {
  it('should return search results', () => {
    const text = 'partch';
    const results = Tune.search(text);
    expect(results).toHaveLength(14);
    expect(results[0]).toEqual('partchBarstow');
    expect(results[7]).toEqual('partch37');
  });
});

describe('Chord', () => {
  const tune = new Tune();
  const tunejs = new TuneJS();
  const myMicrotonalChord = [60, 67, 71];
  expect(tune.chord(myMicrotonalChord)).toEqual(tunejs.chord(myMicrotonalChord));
});
