var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = u_Size;\n' +
  '}\n';

var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL() {
  canvas = document.getElementById('webgl')
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectVariablesToGLSL() {
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if(!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const PAINTBRUSH = 3;
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_selectedSegments = 10;

function addActionsForHtmlUI() {
  document.getElementById('clear').onclick = function() { g_shapesList = [], renderAllShapes() };
  document.getElementById('pointButton').onclick = function() { g_selectedType=POINT };
  document.getElementById('triangleButton').onclick = function() { g_selectedType=TRIANGLE };
  document.getElementById('circleButton').onclick = function() { g_selectedType=CIRCLE };
  document.getElementById('paintbrushButton').onclick = function() { g_selectedType=PAINTBRUSH };
  document.getElementById('goblinButton').onclick = function() { drawGob() };

  document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectedColor[0] = this.value/100 })
  document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectedColor[1] = this.value/100 })
  document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectedColor[2] = this.value/100 })
  document.getElementById('alphaSlide').addEventListener('mouseup', function() { g_selectedColor[3] = this.value/100})
  document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selectedSize = this.value })
  document.getElementById('segmentsSlide').addEventListener('mouseup', function() { g_selectedSegments = this.value })
}

function main() {
  setupWebGL();
  connectVariablesToGLSL();
  addActionsForHtmlUI();
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev) }}
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapesList = [];

function click(ev) {
  let [x, y] = convertCoordinatesEventToGL(ev);

  let point;
  if (g_selectedType==POINT) {
    point = new Point();
  }
  else if (g_selectedType==TRIANGLE) {
    point = new Triangle();
  }
  else if (g_selectedType==CIRCLE) {
    point = new Circle();
  }
  else {
    point = new Paintbrush();
  }

  point.position = [x, y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  point.segments = g_selectedSegments;
  g_shapesList.push(point);

  renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; 
  var y = ev.clientY; 
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  return ([x, y]);
}

function renderAllShapes() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.BLEND);
  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }
}
