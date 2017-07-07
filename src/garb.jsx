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
