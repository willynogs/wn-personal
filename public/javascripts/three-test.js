//SETUP
THREE.Cache.enabled = true;
var container, stats, permalink, hex, color;
var camera, cameraTarget, scene, renderer;
var group, textMesh1, textMesh2, textGeo, material;
var firstLetter = true;
var text = "real friends",
  height = 20,
  size = 70,
  hover = 30,
  curveSegments = 4,
  bevelThickness = 1.5,
  bevelSize = 3,
  bevelSegments = 10,
  bevelEnabled = true,
  font = undefined,
  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = "bold"; // normal bold
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var fontIndex = 1;

init();
animate();

function onDocumentMouseMove(event) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}
function decimalToHex( d ) {
  var hex = Number( d ).toString( 16 );
  hex = "000000".substr( 0, 6 - hex.length ) + hex;
  return hex.toUpperCase();
}
function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  // CAMERA
  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
  camera.position.set( 0, 400, 700 );
  cameraTarget = new THREE.Vector3( 0, 150, 0 );
  // SCENE
  scene = new THREE.Scene();
  // LIGHTS
  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
  dirLight.position.set( 0, 0, 1 ).normalize();
  scene.add( dirLight );
  var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
  pointLight.position.set( 0, 100, 90 );
  scene.add( pointLight );
  material = new THREE.MultiMaterial( [
    new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
    new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) // side
  ] );
  group = new THREE.Group();
  group.position.y = 100;
  scene.add( group );
  loadFont();
  // RENDERER
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}
function addParticles(centerOffset) {
  particles = new THREE.Geometry();
  pMaterial = new THREE.PointsMaterial({
    color: 0xB0C5E6,
    size: 5,
    transparent: true
  });

  for (var p = 0; p < textGeo.vertices.length/2; p++) {
    var rand = Math.floor(Math.random() * textGeo.vertices.length);
    var pX = textGeo.vertices[rand].x;
    var pY = textGeo.vertices[rand].y;
    var pZ = textGeo.vertices[rand].z;
    particle = new THREE.Vector3(pX, pY, pZ);
    particles.vertices.push(particle);
  }

  particleSystem = new THREE.Points( particles, pMaterial );
  particleSystem.position.x = centerOffset;
  particleSystem.position.y = 30;
  particleSystem.position.z = 0;
  scene.add(particleSystem);
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function boolToNum( b ) {
  return b ? 1 : 0;
}
function loadFont() {
  var loader = new THREE.FontLoader();
  loader.load( '/javascripts/PoetsenOne.json', function ( response ) {
    font = response;
    refreshText();
  } );
}
function createText() {
  textGeo = new THREE.TextGeometry( text, {
    font: font,
    size: size,
    height: height,
    curveSegments: curveSegments,
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled,
    material: 0,
    extrudeMaterial: 1
  });
  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();
  // "fix" side normals by removing z-component of normals for side faces
  // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
  if ( ! bevelEnabled ) {
    var triangleAreaHeuristics = 0.1 * ( height * size );
    for ( var i = 0; i < textGeo.faces.length; i ++ ) {
      var face = textGeo.faces[ i ];
      if ( face.materialIndex == 1 ) {
        for ( var j = 0; j < face.vertexNormals.length; j ++ ) {
          face.vertexNormals[ j ].z = 0;
          face.vertexNormals[ j ].normalize();
        }
        var va = textGeo.vertices[ face.a ];
        var vb = textGeo.vertices[ face.b ];
        var vc = textGeo.vertices[ face.c ];
        var s = THREE.GeometryUtils.triangleArea( va, vb, vc );
        if ( s > triangleAreaHeuristics ) {
          for ( var j = 0; j < face.vertexNormals.length; j ++ ) {
            face.vertexNormals[ j ].copy( face.normal );
          }
        }
      }
    }
  }
  var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
  addParticles(centerOffset);
}
function refreshText() {
  if ( !text ) return;
  createText();
}

//
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {
  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05 + 15;
  camera.lookAt( scene.position );
  renderer.clear();
  renderer.render( scene, camera );
}
