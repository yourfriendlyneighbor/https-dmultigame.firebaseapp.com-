var materials = [
      createMaterial( 'images/sky.png' ), // right
      createMaterial( 'images/sky.png' ), // top
      createMaterial( 'images/sky.png' ), // left
      createMaterial( 'images/ground.png' ), // bottom
      createMaterial( 'images/sky.png' ), // back
      createMaterial( 'images/sky.png' )  // front
  ];

  // Create a large cube
  var mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );

  // Set the x scale to be -1, this will turn the cube inside out
  mesh.scale.set(-1,1,1);
  scene.add( mesh );

function createMaterial( path ) {
  var texture = THREE.ImageUtils.loadTexture(path);
  var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

  return material;
}
