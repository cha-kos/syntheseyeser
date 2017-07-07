import * as Arp from './arp';
import Tone from 'tone';
import { createKeyboard } from './keyboard';


// Arp.start();

document.addEventListener("DOMContentLoaded", () => {
  var fft = new Tone.Analyser('fft', 32);
  var waveform = new Tone.Analyser('waveform', 4096);
  var delay = new Tone.FeedbackDelay(0,0).fan(waveform, fft).toMaster();
  var synth = new Tone.Synth( {oscillator: {type:"sine"}} ).connect(delay);


  document.querySelectorAll('button').forEach(function(button){
  	button.addEventListener('mousedown', function(e){

  		synth.triggerAttackRelease(e.target.id);
  	});
  	button.addEventListener('mouseup', function(e){

  		synth.triggerRelease();
    });

    // Arp.start();

    // var canvas = document.getElementById("Canvas");
    // var canvasCtx = canvas.getContext("2d");
    // canvas.width = 800;
    // canvas.height = 400;

    nx.onload = () => {
      feedback.on('value', function(value) {
        console.log(value);
        delay.feedback.overridden = true;
        delay.feedback._param.value = value;
      });

      delayTime.on('value', function(value) {
        console.log(value);
        console.log(delay);
        delay.delayTime.overridden = true;
        delay.delayTime._param.value = value;
      });
    };


    // function draw() {
    //   requestAnimationFrame(draw);
    //   let fftArr= fft.analyse();
    //   // console.log(fftArr);
    //
    //   // analyser.getByteFrequencyData(dataArray);
    //   let WIDTH = canvas.width;
    //   let HEIGHT = canvas.height;
    //   canvasCtx.fillStyle = 'rgb(233,34,101)';
    //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    //
    //   var barWidth = (WIDTH / fftArr.length) * 2;
    //   var barHeight;
    //   var x = 0;
    //
    //   for(var i = 0; i < fftArr.length; i++) {
    //     barHeight = fftArr[i] / 2;
    //
    //     canvasCtx.fillStyle = 'rgb(56,181,75)';
    //     canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);
    //
    //     x += barWidth + 1;
    //   }
    // }

    // draw();


    var canvas2 = document.getElementById("wave");
    var canvasCtx2 = canvas2.getContext("2d");
    canvas2.width = 800;

    function draw2() {
      requestAnimationFrame(draw2);
      let waveData = waveform.analyse();


      let WIDTH = canvas2.width;
      let HEIGHT = canvas2.height;
      canvasCtx2.fillStyle = 'rgb(56,181,75)';
      canvasCtx2.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx2.lineWidth = 2;
      canvasCtx2.strokeStyle = 'rgb(233,34,101)';

      canvasCtx2.beginPath();

      var sliceWidth = WIDTH * 1.0 / waveData.length;
      var x = 0;

      for(var i = 0; i < waveData.length; i++) {
        var v = waveData[i] / 128;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx2.moveTo(x, y);
        } else {
          canvasCtx2.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx2.lineTo(canvas2.width, canvas2.height/2);
      canvasCtx2.stroke();
    }

    draw2();

    createKeyboard();
  });
});
