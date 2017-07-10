var fft = new Tone.Analyser("fft", 32);


const fftContext = $("<canvas>",{
  "id" : "fft"
}).appendTo("#Content").get(0).getContext("2d");
function drawFFT(values){
  var canvasWidth = 100;
  var canvasHeight = 50;
  fftContext.clearRect(0, 0, canvasWidth, canvasHeight);
  var barWidth = canvasWidth / fft.size;
  for (var i = 0, len = values.length; i < len; i++){
    var val = values[i] / 255;
    var x = canvasWidth * (i / len);
    var y = val * canvasHeight;
    fftContext.fillStyle = "rgba(0, 0, 0, " + val + ")";
    fftContext.fillRect(x, canvasHeight - y, barWidth, canvasHeight);
  }
}

// function loop(){
//   requestAnimationFrame(loop);
//   //get the fft data and draw it
//   var fftValues = fft.analyse();
//   console.log(fftValues);
//   drawFFT(fftValues);
//
// }
// loop();


// <style type="text/css" id = 'Content'>
// canvas {
//   margin-top: 2px;
//   width: 100%;
//   height: 255px;
// }
// </style>

// document.querySelectorAll('button').forEach(function(button){
// 	button.addEventListener('mousedown', function(e){
//
// 		synth.triggerAttackRelease(e.target.id);
// 	});
// 	button.addEventListener('mouseup', function(e){
//
// 		synth.triggerRelease();
//   });

  // Arp.start();

  // var canvas = document.getElementById("Canvas");
  // var canvasCtx = canvas.getContext("2d");
  // canvas.width = 800;
  // canvas.height = 400;


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
