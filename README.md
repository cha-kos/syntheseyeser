## SynthesEyeser Proposal

### Background

SynthesEyeser is a a basic syntesizer with 1 oscillator and a few basic effects.

### Functionality & MVP  

Users of SynthesEyeser will be able to:

- [ ] Play notes of their choice
- [ ] Apply a filter the sound output using a visual graph
- [ ] Add delay with ability customize time, feedback, and mix

In addition, this project will include:

- [ ] An About modal describing the background layout and Functionality of the synth
- [ ] A production README

### Wireframes

This app will consist of a single screen with a piano layout, volume and effects controls, along with nav links to the Github, my LinkedIn,
and the About modal.  Synth controls will be controlled with using on click event handlers.  The synth will live centered in the window. On the bottom will be the piano keyboard and above the effects rack. From left to right of the effects rack will be volume control, frequency filter, and delay.  Additionally, a visual waveform representation of the current note being played will be added above the effects rack.  (see Bonus Features).

![wireframes]

### Architecture and Technologies


This project will be implemented with the following technologies:

- `JavaScript` for note and value assignment,
- `Tone.js` for audio and effects,
- `Nexus UI` to for visual interface,
- `Webpack` to bundle the files

In addition to the entry file, there will be three scripts involved in this project:

`synth.js`: this script will handle the logic for creating the sound

`filter.js`: this script will handle the logic of the filer to be applied to the sound. It will take in the output from the synth, process it and then forward the signal to the delay. There will be control of volume level at chosen frequency visualized through effect

`delay.js`: this script will handle the logic of the delay. There will be control for the delay time, delay feedback, and delay mix which will be handled through 3 knobs indicating value of each.

### Implementation Timeline

**Day 1**: Learn to use `Tone.js` and `NexusUI.js `installed. Write a basic entry file which has a button that toggles a sinewave oscillator on and off. Goals for the day:

Setup all necessary

- Download `Tone.js` and` NexusUI.js`
- Learn enough of both libraries mentioned to play a sinewave with a toggle of a buttn.

**Day 2**: Dedicate this day to learning the `Foo.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid, ideally all 3 grid types.  Build in the ability to toggle the live/dead states on click for each cell.  Goals for the day:

Learn the `Tone.js` and `NexusUI.js` API. Build out the filter and delay to be working with values set in the backend.

- Complete the `filter.js` and `delay.js` modules (constructor, update functions)
- Render a keyboard to the bottom of the synth.
- Make each key in the board clickable, playing a note on each click.
- Add visual filter controller and buttons to control delay.

**Day 3**: Connect the visual filter and delay buttons to live update the values when changes.
- Make the effects apply to the audio immediately
- Have the visual autofilter working based on a scale of 0hz-22khz


**Day 4**: Style the frontend, making it polished and professional.  Goals for the day:

- Position frontend, color, and choose a nice font
- If time: include animation of soundwave
