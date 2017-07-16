import * as Arp from './arp';
import Tone from 'tone';
import { NOTES, KEY_OBJ} from './notes';
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
      keyboard.octaves = 1.43;
      keyboard.init();

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
        "url": "audio/Underwaterfall.m4a"
      }).fan(waveform).toMaster();



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

              // Get the modal
        var welcomeModal = document.getElementById('welcomeModal');
        var span = document.getElementsByClassName("close")[0];
        welcomeModal.style.display = "block";
        span.onclick = function() {
            welcomeModal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == welcomeModal) {
                welcomeModal.style.display = "none";
            }
        };

    init();
    animate();
  });
