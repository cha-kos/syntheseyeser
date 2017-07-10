import * as Arp from './arp';
import Tone from 'tone';
import { NOTES, KEY_OBJ} from './constants';
// import {init, animate, waveform} from './waveform3d.js';
import {init, animate, waveform} from './waveformparticles.js';



// Arp.start();

document.addEventListener("DOMContentLoaded", () => {
  var fft = new Tone.Analyser('fft', 32);
  // var waveform = new Tone.Analyser('waveform', 4096);
  var delay = new Tone.FeedbackDelay(0,0).fan(waveform, fft).toMaster();
  delay.wet._param.value = 0.5;
  var synth = new Tone.FMSynth( {oscillator: {type:"sine"}} ).connect(delay);


    nx.onload = () => {

      feedback.on('value', function(value) {
        delay.feedback.overridden = true;
        delay.feedback._param.value = value;
      });

      delayTime.on('value', function(value) {
        delay.delayTime.overridden = true;
        delay.delayTime._param.value = value;
      });

      keyboard.on('*', function(data){
        if( data.on !== 0 ){
        synth.triggerAttackRelease(NOTES[data.note - 48], "8n");
        console.log(NOTES[data.note - 48], data);
        }
      });
    };



    document.onkeydown = function(e){
      keyboard.toggle(keyboard.keys[KEY_OBJ[e.keyCode].key]);
     };
    document.onkeyup = function(e){
      keyboard.toggle(keyboard.keys[KEY_OBJ[e.keyCode].key]);
     };




    // var canvas2 = document.getElementById("wave");
    // var canvasCtx2 = canvas2.getContext("2d");
    // canvas2.width = 800;
    // canvas2.height = 250;
    //
    // function draw2() {
    //   requestAnimationFrame(draw2);
    //   let waveData = waveform.analyse();
    //
    //
    //   let WIDTH = canvas2.width;
    //   let HEIGHT = canvas2.height;
    //   canvasCtx2.fillStyle = 'rgb(56,181,75)';
    //   canvasCtx2.fillRect(0, 0, WIDTH, HEIGHT);
    //
    //   canvasCtx2.lineWidth = 2;
    //   canvasCtx2.strokeStyle = 'rgb(233,34,101)';
    //
    //   canvasCtx2.beginPath();
    //
    //   var sliceWidth = WIDTH  / waveData.length;
    //   var x = 0;
    //
    //   for(var i = 0; i < waveData.length; i++) {
    //     var v = waveData[i] / 128;
    //     var y = v * HEIGHT/2;
    //
    //     if(i === 0) {
    //       canvasCtx2.moveTo(x, y);
    //     } else {
    //       canvasCtx2.lineTo(x, y);
    //     }
    //
    //     x += sliceWidth;
    //   }
    //
    //   canvasCtx2.lineTo(canvas2.width, canvas2.height/2);
    //   canvasCtx2.stroke();
    // }
    //
    // draw2();


    init();
    animate();
  });
