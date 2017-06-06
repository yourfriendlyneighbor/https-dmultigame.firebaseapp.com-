var container, scene, camera, renderer;

var controls;

init();
animate();

function init(){
  // Setup
  container = document.getElementById('container');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);


  firebase.auth().onAuthStateChanged((user) => {
    if(user){

      pid = user.uid

      loadGame();
    }else{
      firebase.auth().signInAnonymously().catch((err) => {
        console.error(err.code + ":" + err.message);
      })
    }
  });

  // Events
  window.addEventListener('resize', onWindowResize, false);

  container.appendChild( renderer.domElement );
	document.body.appendChild( container );

}

function animate(){
  requestAnimationFrame(animate);

  if(controls){
    controls.update()
  }

  render()
}

function render(){
  renderer.clear();
  renderer.render(scene, camera)
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight)
}
