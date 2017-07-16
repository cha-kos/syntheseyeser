import * as Arp from './arp';
import Tone from 'tone';
import { NOTES, KEY_OBJ} from './notes';
// import {init, animate, waveform} from './waveform3d.js';
import {init,
        animate,
        waveform,
        resetCamera,
        zoomCamera} from './waveformparticles.js';


// Arp.start();
export var viewing = false;

document.addEventListener("DOMContentLoaded", () => {


  var fft = new Tone.Analyser('fft', 32);
  var delay = new Tone.FeedbackDelay(0.5, 0.5).fan(waveform, fft).toMaster();
  delay.wet._param.value = 0.5;
  var synth = new Tone.Synth().connect(delay);

  var c=document.getElementById("feedback");
  var ctx=c.getContext("2d");


  var grd=ctx.createLinearGradient(0,0,95,0);
    grd.addColorStop(0,"#FF00CC");
    grd.addColorStop(1,"#24BEE5");

    nx.onload = () => {
      keyboard.octaves = 1.43;
      keyboard.init();

      feedback.val.value = 0.5;
      feedback.colors.accent = grd;
      feedback.init();

      delayTime.val.value = 0.5;
      delayTime.colors.accent = grd;
      delayTime.fontColor = 'white';
      delayTime.init();

      feedback.on('value', function(value) {
        delay.feedback.overridden = true;
        delay.feedback._param.value = value;
      });

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
      synthView.style.display = 'none';
    };

    document.onkeydown = function(e){
      if (KEY_OBJ[e.keyCode]){
      keyboard.toggle(keyboard.keys[KEY_OBJ[e.keyCode].key]);
    }
     };
    document.onkeyup = function(e){
      if (KEY_OBJ[e.keyCode]){
      keyboard.toggle(keyboard.keys[KEY_OBJ[e.keyCode].key]);
      }
     };



      var player = new Tone.Player({
        "url": "audio/Drowning.mp3"
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

      const viewButton = document.getElementById('view');
      const viewOn = document.getElementById('view-on');
      const viewOff = document.getElementById('view-off');
      viewButton.removeChild(viewOff);

      viewButton.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if( viewing === false ){
          viewing = true;
          viewButton.removeChild(viewOn);
          viewButton.appendChild(viewOff);
        } else {
          viewing = false;
          viewButton.removeChild(viewOff);
          viewButton.appendChild(viewOn);
          resetCamera();
        }
      });

      const synthDiv = document.getElementById('synth-div');
      const synthViewButton = document.getElementById('synth-view-button');
      const synthView = document.getElementById('synth-view');
      const synthViewClose = document.getElementById('synth-view-close');


      synthViewButton.addEventListener('mousedown', function (e) {
        e.preventDefault();
        synthDiv.removeChild(synthViewButton);
        synthView.style.display = 'block';
      });

      synthViewClose.addEventListener('mousedown', function (e) {
        e.preventDefault();
        synthView.style.display = 'none';
        synthDiv.appendChild(synthViewButton);
      });

      document.addEventListener('wheel', function (e) {
        if (viewing === true){
          if( e.deltaY < 0){
            zoomCamera(-100);
          } else if( e.deltaY > 0){
            zoomCamera(100);
          }
        }
      });

      // var view = document.getElementById('view');
      //   view.addEventListener('on', function (e) {
      //     console.log(e);
      //   }
      // );
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

        var infoButton = document.getElementById('info-button');
          infoButton.addEventListener('mousedown', function(e) {
            e.preventDefault();
            welcomeModal.style.display = 'block';
          });

    init();
    animate();
  });
