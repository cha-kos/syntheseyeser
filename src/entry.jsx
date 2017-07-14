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
  var synth = new Tone.Synth( {oscillator: {type:"sine"}} ).connect(delay);

  var c=document.getElementById("feedback");
  var ctx=c.getContext("2d");

  // Create gradient
  var grd=ctx.createLinearGradient(0,0,95,0);
    grd.addColorStop(0,"#FF00CC");
    grd.addColorStop(1,"#24BEE5");

    nx.onload = () => {

      feedback.val.value = 0.5;
      feedback.on('value', function(value) {
        delay.feedback.overridden = true;
        delay.feedback._param.value = value;
      });

      feedback.colors.accent = grd;
      delayTime.colors.accent = grd;

      delayTime.on('value', function(value) {
        delay.delayTime.overridden = true;
        delay.delayTime._param.value = value;
      });

      keyboard.on('*', function(data){
        if( data.on !== 0 ){
        synth.triggerAttackRelease(NOTES[data.note - 48], "8n");
        }
      });
    };



    document.onkeydown = function(e){
      keyboard.toggle(keyboard.keys[KEY_OBJ[e.keyCode].key]);
     };
    document.onkeyup = function(e){
      keyboard.toggle(keyboard.keys[KEY_OBJ[e.keyCode].key]);
     };



      var player = new Tone.Player({
        "url": "audio/Frogs.mp3"
      }).fan(waveform).toMaster();

      // document.querySelectorAll('button').forEach(function(button){
      // 	button.addEventListener('mousedown', function(e){
      // 		player.start();
      // 	});
      //   });



      // playButton.addEventListener('mousedown', function (e) {
      //   if (player.state === 'stopped') {
      //     player.start();
      //     playButton.replaceChild(document.getElementById('play'));
      //   }
      // });

      const playButton = document.getElementById('play-button');
      const stop = document.getElementById('stop');
      const play = document.getElementById('play');
      playButton.removeChild(stop);

      playButton.addEventListener('mousedown', function (e) {
        if (player.state === 'stopped') {
          player.start();
          playButton.removeChild(play);
          playButton.appendChild(stop);
        }else if (player.state === 'started') {
          player.stop();
          playButton.removeChild(stop);
          playButton.appendChild(play);
        }
      });

    init();
    animate();
  });



  //  var buffer = new Tone.Buffer("audio/toro.mp3", function(){
  //   	//the buffer is now available.
  //   	const buff = buffer.get();
  //     console.log(buff);
  //   });
