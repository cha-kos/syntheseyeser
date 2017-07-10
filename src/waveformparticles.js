
    import Tone from 'tone';

      var SEPARATION = 10, AMOUNTX = 100, AMOUNTY = 100;
			var container, stats;
			var camera, scene, renderer;
			var particles, particle, count = 0;
			var mouseX = 0, mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
      export const waveform = new Tone.Analyser('waveform', 4096);
			// init();
			// animate();
			export function init() {
				container = document.createElement( 'div' );
				document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 500;
        // camera.position.y = 180;
        // camera.position.x = -450;
				scene = new THREE.Scene();
				particles = [];
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {
					color: 0xffffff,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
					}
				} );
				var i = 0;
				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
						particle = particles[ i ++ ] = new THREE.Sprite( material );
						particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
						particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
						scene.add( particle );
					}
				}
				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( 800, 800 );
				document.body.appendChild( renderer.domElement );
				// stats = new Stats();
				// container.appendChild( stats.dom );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				//
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
			//
			export function animate() {
				requestAnimationFrame( animate );
				render();
				// stats.update();
			}
			function render() {
				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				camera.lookAt( scene.position );
        // console.log(camera.position);

        var array = waveform.analyse();
				var i = 0;
				for ( var ix = 0; ix < 100; ix ++ ) {
					for ( var iy = 0; iy < 100; iy ++ ) {
						particle = particles[ i ];
						particle.position.y = (array[i] -128);
            i++;
            //
            // // ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
						// // 	( Math.sin( ( iy + count ) * 0.5 ) * 50 );
            // particle.position.y = array[iy];
						// particle.scale.x = particle.scale.y = 10;
					}
				}
				renderer.render( scene, camera );
				count += 0.1;
			}
