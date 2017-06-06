var Player = function(pid,color){
  this.pid = pid;
  this.isMainPlayer = false;
  this.mesh;
  this.color = color;

  var cube_geometry = new THREE.BoxGeometry(1,1,1);
  // var colors = prompt('What color would you like to do?')
  var cube_material = new THREE.MeshBasicMaterial({color: this.color, wireframe: false});

  var scope = this;

  this.init = function(){
    scope.mesh = new THREE.Mesh(cube_geometry,cube_material);

    scene.add(scope.mesh);

    if(scope.isMainPlayer){
      controls = new THREE.PlayerControls(camera,scope.mesh);
      controls.init()
    }
  }

  this.setOrientation = function(position, rotation){
    if(scope.mesh){
      scope.mesh.position.copy(position);

      scope.mesh.rotation.x = rotation.x
      scope.mesh.rotation.y = rotation.y
      scope.mesh.rotation.z = rotation.z
    }
  }
}
