import Tone from 'tone';


let synth = new Tone.Synth();
let synth2 = new Tone.Synth();

// synth.toMaster();
// synth2.toMaster();


// synth.triggetAttackRelease("C4", 0.25, time);

const pattern = new Tone.Pattern(function(time, none){
  synth.triggerAttackRelease(none, 0.5);
}, ["E1", "C1", "A1", "G1", "F1"]);

const pattern2 = new Tone.Pattern(function(time, none){
  synth2.triggerAttackRelease(none, 0.5);
}, ["E3", "C3", "A3", "G3", "F3"]);

pattern.start(1);

pattern2.start(1);

export const start = () => Tone.Transport.start();
