# Tune.ts

TypeScript port of [Tune.JS](https://github.com/abbernie/tune) by Andrew Bernstein & Ben Taylor

**Overview:** Tune.js is a web audio tuning library of microtonal and just intonation scales. Tune.js supports over 3,000 historical tunings and temperaments, ported from the vast [Scala](http://www.huygens-fokker.org/scala/) tuning archive via the Microtuner files [compiled and documented by Victor Cerullo](http://www.venetica.net/Sites/16tone/mtx_file_specs.htm).

**List of Tunings:** [Tunings](https://github.com/djensenius/tune.ts/blob/main/TUNINGS.md)

**Full Documentation:** [Full Documentation](https://djensenius.github.io/tune.ts/)

### Usage

```ts
import { Tune, TuningSystem } from 'tune.ts';

// Initiate Tune.ts
const tune = new Tune();

// Load a scale
tune.loadScale(TuningSystem.partchUr);
```

Set the root frequency that you'll be working with. This sets your scale to the key of A 440

```ts
tune.tonicize(220);
```

Pass scale degree numbers to the ```note() ``` method. By default, ```note(degree, octave) ``` returns the corresponding frequency in Hertz. You can use ```note() ``` to set the frequency of an oscillator.

```ts
osc.frequency.value = tune.note(2, 0);
```

This will return the frequency for the third note in the scale, one octave down.

```ts
osc.frequency.value = tune.note(2,-1);
```



### Properties

#### Tune.mode.output

Set the output mode of `tune.note()`. Choose between 

- **frequency**: `tune.note()` will return a hertz value, e.g. 392.43834 for a pure G4 over C4
- **ratio**: `tune.note()` will return a ratio value, e.g. 1.5 for a pure G over C
- **MIDI**: `tune.note()` will return an adjusted MIDI pitch, e.g. 67.0195 for a pure G4 over C4

```js
// Set the output mode to 'ratio', e.g. the ratio 3/2 will output 1.5
tune.mode.output = 'ratio';
```

The default output mode is 'frequency'. Currently the only available input mode is 'MIDI'. 

#### Tune.tonic

The current root frequency of this Tune instance. To set the tonic of a Tune instance use the ```tonicize()``` method. The default tonic is set to 440 Hz.

```ts
let tonic = 200;
```

#### Tune.scale

Read only. An array containing the ratio values of the current scale loaded with the ```loadScale()``` method.

```ts
// Returns the length of the current scale
let scaleLength = tune.scale.length;
```



### Methods

#### Tune.note(scale-degree-# [, octave-#])

Returns a microtonally tuned note value for any scale degree input. By default, `Tune.note` returns a frequency value in hertz.

```ts
// This will return the frequency for 7th scale degree of our scale
let note = tune.note(7, 0)
```

Depending on `Tune.mode`, the `Tune.note` method may return a frequency value in hertz (default, e.g. 392.43834 for a pure G4 over C4), a ratio value as a float (e.g. 1.5 for a pure G over C), or a MIDI float value (e.g. 67.0195 for a pure G4 over C4). See `Tune.mode`.

An optional second argument lets you specify what octave to be played (i.e. -1 for one octave down, 1 for one octave up). 

Additionally, `tune.note()` automatically wraps scale degrees that are out of range, so that `tune.note(8)` in a 7 note scale will return the second scale degree, one octave up. Therefore, given a 7 note scale, `tune.note(8)` is equivalent to `tune.note(1,1)`

#### Tune.tonicize(frequency)

Sets the scale's root frequency.

```ts
// sets the base (tonic) frequency to 200 Hz
tune.tonicize(200);
```

#### Tune.chord([array-of-scale-degree-#s])

Returns an array of note values. Like `Tune.note()`, `Tune.chord()` returns values according to the current output mode (`Tune.mode`). 

```ts
// returns a three note chord with the specified scale degrees
let myMicrotonalChord = [60, 67, 71];
tune.chord(myMicrotonalChord);
```

#### Tune.search('string')

Searches through the scale archive for scales that match the query.

```ts
//returns an array of scale names that contain the word "partch"
tune.search('partch');
```

### Example Tunings

| Name | Description |
|------|-------------|
| ji_12 | Basic just instonation with 7-limit tritone |
| harm30 | First 30 harmonics and subharmonics |
| pyth_31 | 31-tone Pythagorean scale |
| ptolemy | Intense Diatonic Syntonon, also Zarlino's scale |
| couperin | Couperin modified meantone |
| helmholtz_pure | Helmholtz's two-keyboard harmonium tuning untempered |
| partch_43 | Harry Partch's 43-tone pure scale |
| johnston_81 | Ben Johnston's 81-note 5-limit scale of Sonata for Microtonal Piano |
| young-lm_piano | LaMonte Young's Well-Tempered Piano |
| xenakis_chrom | Xenakis's Byzantine Liturgical mode, 5 + 19 + 6 parts |
| slendro | Observed Javanese Slendro scale, Helmholtz/Ellis p. 518, nr.94 |
| harrison_5 | From Lou Harrison, a pelog style pentatonic |
| malkauns | Mode of Indian Raga Malkauns, inverse of prime_5 |

