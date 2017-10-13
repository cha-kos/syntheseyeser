    import { viewing } from './entry';
    import Tone from 'tone';

      var SEPARATION = 10, AMOUNTX = 32, AMOUNTY = 128;
			var container, stats;
			var camera, scene, renderer;
			var particles, particle, count = 0;
			var mouseX = 0, mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
      export const waveform = new Tone.Analyser('waveform', 128);


			export function init() {

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
				// camera.position.z = -25;
        // camera.position.y = 500;
        // camera.position.x = 0;
				camera.position.z = 75;
        camera.position.y = 120;
        camera.position.x = -500;
				scene = new THREE.Scene();
				particles = [];
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {

					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
					}
				} );
				var i = 0;
				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
						particle = particles[ i++] = new THREE.Sprite( material );
						particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
						particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
						scene.add( particle );
					}
				}

				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.className = 'visual';
				document.body.appendChild( renderer.domElement );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				window.addEventListener( 'resize', onWindowResize, false );
			}

			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onDocumentMouseMove( event ) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentTouchStart( event ) {
				if ( event.touches.length === 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}

			function onDocumentTouchMove( event ) {
				if ( event.touches.length === 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}

			export function animate() {
				requestAnimationFrame( animate );
				render();
			}

      export function resetCamera(){
        camera.position.z = 75;
        camera.position.y = 120;
        camera.position.x = -500;
      }

      export function zoomCamera(num){
        camera.position.z += num;
      }

			export function render() {
        if(viewing === true){
  				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        }
				camera.lookAt( scene.position );

        var array = waveform.analyse();
				var i = 0;
        var j = 0;
				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
						particle = particles[ i ];
						particle.position.y = (((array[j] -128) * 1.5 ));
            particle.scale.x = particle.scale.y = 3;
            if ( (array[j] - 128) % 2 === 0 ){
              particle.material.color.r = array[j] - 127;
            }
            else if ( (array[j] - 128) % 3 === 0 ){
              particle.material.color.g = array[j] - 127;
            }
            i++;
            j++;
            if ( j === 128 ){
              j = 0;
            }
					}
				}

				renderer.render( scene, camera );
			}
