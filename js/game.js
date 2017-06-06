var otherPlayers = {};
var pid;
var color;
var player;

function loadGame(){
  loadEnvironment();
  initMainPlayer();
  listenToOtherPlayers();

  window.onunload = function(){
    fbRef.child('Players/'+ pid).remove()
  }

  window.onbeforeunload = function(){
    fbRef.child('Players/' + pid).remove()
  }
}

function listenToPlayer( playerData ) {
	if ( playerData.val() ) {
		otherPlayers[playerData.key].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation );
	}
}

function listenToOtherPlayers() {
	fbRef.child("Players").on( "child_added", function( playerData ) {
		if ( playerData.val() ) {
			if ( pid != playerData.key && !otherPlayers[playerData.key] ) {
				otherPlayers[playerData.key] = new Player( playerData.key, playerData.val().orientation.color);
        otherPlayers[playerData.key].init();
				fbRef.child("Players/" + playerData.key).on("value", listenToPlayer );
			}
		}
	});

  fbRef.child( "Players" ).on( "child_removed", function( playerData ) {
		if ( playerData.val() ) {
			fbRef.child( "Players/" + playerData.key ).off( "value", listenToPlayer );
			scene.remove( otherPlayers[playerData.key].mesh );
			delete otherPlayers[playerData.key];
		}
	});
}

function initMainPlayer(){

  pid = fbRef.child('Players').push().key;
  r = document.cookie.replace(/(?:(?:^|.*;\s*)color\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  color = r || 'rgba(0,0,0)';

  fbRef.child('Players/' + pid + '/orientation').set({
    position: {x:0, y:0, z:0},
    rotation: {x:0, y:0, z:0},
    color: r || 'rgba(0,0,0)'
  });

  player = new Player(pid,color);
  player.isMainPlayer = true;
  player.init()
}

function loadEnvironment(){
  var sphere_geometry = new THREE.SphereGeometry(1);
  var sphere_material = new THREE.MeshBasicMaterial({color: "rgb(255, 255, 0)"});
  var sphere = new THREE.Mesh( sphere_geometry, sphere_material);

  scene.add(sphere)
}
