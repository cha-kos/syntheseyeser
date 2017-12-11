import Tone from 'tone';
import { NOTES, KEY_OBJ} from './notes';
import {init,
        animate,
        waveform,
        resetCamera,
        zoomCamera,
        render} from './waveformparticles.js';

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
     }).fan(waveform).toMaster();

     let trackIndex = 0;
     let trackLoaded = false;

     const trackOne = new Tone.Buffer("audio/Drowning.mp3",() => {
       player.buffer = tracks[trackIndex];
       playNav.removeChild(loadingDisc);
       playNav.appendChild(navButtons);
       trackLoaded = true;
     });

     const trackTwo = new Tone.Buffer("audio/No one is looking at U (feat. Lorraine).mp3");
     const trackThree = new Tone.Buffer('audio/GimmeSome.mp3');
     const trackFour = new Tone.Buffer('audio/LifeRoundHere.mp3');

     const tracks = [
       trackOne,
       trackTwo,
       trackThree,
       trackFour
     ];

     let trackList = ["Drowning In You",
       "No one is looking at U (feat. Lorraine)",
       "Gimme Some",
       'Life Round Here'
      ];

    let artistList = ["Pascaal",
      "Nicolas Jaar",
      "Weval",
      "James Blake ft. Chance The Rapper"];

     const playButton = document.getElementById('play-button');
     const stop = document.getElementById('stop');
     const play = document.getElementById('play');
     const pause = document.getElementById('pause');
     const skipForward = document.getElementById('skip-forward');
     const skipBack = document.getElementById('skip-back');
     const trackText = document.getElementById('track-text');
     const trackArtist = document.getElementById('track-artist');
     const playNav = document.getElementById('play-navigation');
     const navButtons = document.getElementById('navigation-buttons');
     const loadingDisc = document.getElementById('loading-disc');

     trackText.innerHTML = trackList[trackIndex];
     trackArtist.innerHTML = artistList[trackIndex];
     playButton.removeChild(stop);
     playButton.removeChild(pause);
     playNav.removeChild(navButtons);

     var beginning = 0;
     var end = 0;
     var offset = 0;
     var duration;

     const playTrack = () => {
       player.buffer = tracks[trackIndex];
       player.start(Tone.Time().now(), (offset  * player.buffer._buffer.duration));
       Tone.Transport.start(Tone.Time().now());
     };

     playButton.addEventListener('mousedown', function (e) {
       if (player.state === 'stopped') {
         playTrack();
         playButton.removeChild(play);
         playButton.appendChild(pause);
       }else if (player.state === 'started') {
         duration = player.buffer._buffer.duration;
         offset = (Tone.Transport.seconds + (offset * duration)) / duration;
         player.stop();
         Tone.Transport.pause();
         console.log(Tone.Transport.seconds);
         console.log("seconds");
         console.log(player.buffer._buffer.duration);
         console.log("duration");
         playButton.removeChild(pause);
         playButton.appendChild(play);
       }
     });

     skipForward.addEventListener('mousedown', () => {
       Tone.Transport.stop();
       Tone.Transport.seconds = 0;
       trackIndex += 1;
       if( trackIndex > trackList.length - 1) {
         trackIndex = 0;
       }
       trackText.innerHTML = trackList[trackIndex];
       trackArtist.innerHTML = artistList[trackIndex];
       offset = 0;
       if (player.state === "started") {
         playTrack();
         Tone.Transport.start();
       }
     });

     skipBack.addEventListener('mousedown', () => {
       Tone.Transport.stop();
       Tone.Transport.seconds = 0;
       trackIndex -= 1;
       if( trackIndex < 0) {
         trackIndex = trackList.length - 1;
       }
       trackText.innerHTML = trackList[trackIndex];
       trackArtist.innerHTML = artistList[trackIndex];
       offset = 0;
       if (player.state === "started") {
         playTrack();
       }
     });

     let trackSlide = document.getElementById("trackSlide");
     let trackStatus = document.getElementById('trackStatus');

     trackSlide.addEventListener('mousedown', (e) => {
       offset = (e.x - 30) / 200;
       console.log(offset);
       trackStatus.style.width = `${offset * 200}`;
       if (player.state === "started") {
         Tone.Transport.stop();
         Tone.Transport.seconds = 0;
         playTrack();
       }
     });

     let trackSlideAnimate = () => {
       let time = offset + Tone.Transport.seconds / player.buffer._buffer.duration;
       trackStatus.style.width = `${time * 200}`;
       if (time * 200 >= 200) {
         Tone.Transport.stop();
         Tone.Transport.seconds = 0;
         trackIndex += 1;
         if( trackIndex > trackList.length - 1) {
           trackIndex = 0;
         }
         trackText.innerHTML = trackList[trackIndex];
         offset = 0;
         playTrack();
         Tone.Transport.start();
       }
     };

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

        var synthHelpButton = document.getElementById('synth-help-button');
        var synthHelpView = document.getElementById('synth-help');
        var closeSynthHelp = document.getElementById('close-synth-help');
        var helpOpen = false;

        synthHelpView.style.display = "none";

        synthHelpButton.addEventListener('mousedown', function(e) {
          e.preventDefault();
          if (helpOpen === false ){
            helpOpen = true;
            synthHelpView.style.display = "flex";
          }
          else if (helpOpen === true){
            helpOpen = false;
            synthHelpView.style.display = "none";
          }
        });

        closeSynthHelp.addEventListener('mousedown', function(e){
          e.preventDefault();
          synthHelpView.style.display = "none";
        });

        function animate() {
          requestAnimationFrame( animate );
          render();
          if (trackLoaded === true){
            trackSlideAnimate();
          }
        }

        let media = new Tone.UserMedia().fan(waveform);

        console.log(media);
        window.media = media;
        media.enumerateDevices().then(function(devices){
        	console.log(devices);
        });

        // media.open().then(function(){
        // 	//opening is activates the microphone
        // 	//starting lets audio through
        //   console.log("hey it's working");
        // });

    init();
    animate();
  });
