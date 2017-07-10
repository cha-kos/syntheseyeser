import Tone from 'tone';

var scene, camera, renderer, line;
var geometry, material, mesh, array;
export function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, 1, 1, 10000 );
    camera.position.z = 1000;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 800, 400 );
    document.body.appendChild( renderer.domElement );
}

export var waveform = new Tone.Analyser('waveform', 4096);

function newLine() {
	scene.remove(line);
	var material = new THREE.LineBasicMaterial({
		color: 0x0000ff
	});
	var geometry = new THREE.Geometry();
	// array = new Uint8Array(analyser.frequencyBinCount);
	// analyser.getByteFrequencyData(array);

  array = waveform.analyse();
	var Ypoints = array;
	var xPoint = -2048;
	for(var i=0;i<Ypoints.length;i++) {
		geometry.vertices.push( new THREE.Vector3( xPoint, Ypoints[i], 0 ) );
		xPoint = xPoint + 4;
	}
	line = new THREE.Line( geometry, material );
	scene.add( line );
}
export function animate() {
  requestAnimationFrame( animate );
  newLine();
  renderer.render( scene, camera );
}
