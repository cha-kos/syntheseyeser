

var canvas2 = document.getElementById("wave");
var canvasCtx2 = canvas2.getContext("2d");
canvas2.width = 800;
canvas2.height = 250;

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

  var sliceWidth = WIDTH  / waveData.length;
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
