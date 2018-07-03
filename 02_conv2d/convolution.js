/**
 * This example can be found in the Processing examples package
 * that comes with the Processing PDE.
 * Processing > Examples > Topics > Interaction > Follow3
 * Adapted by Evelyn Eastmond
 */

var dim = 20;
var m = math.diag(math.range(1, dim+1));
var mf = math.zeros(dim, dim);
var step = 20;

function setup() {
  createCanvas(640, 600);
  background(255);
  stroke(0, 50);
  mf = conv2d(m);
}

function draw() {
  background(255);
  mf.forEach(function(value, index, matrix) {
    var m = 255 - value*10;
    if(m > 0) {
      fill(m);
      rect(index[0]*step, index[1]*step, step-2, step-2);
    } else {
      fill(m);
      rect(index[0]*step, index[1]*step, step-2, step-2);
    }
  });
  if(mouseIsPressed) {
    var x = round(mouseX/step);
    var y = round(mouseY/step);
    var v = math.subset(m, math.index(x, y));
    m.subset(math.index(x, y), v+10);
    mf = conv2d(m);
  }
}

// 2D conv, see https://en.wikipedia.org/wiki/Kernel_(image_processing)
function conv2d(m) {
  // Filter kernel 3x3
  var ks = 3;
  //    Box blur
  // var k = math.matrix([[1/9, 1/9, 1/9],[1/9, 1/9, 1/9],[1/9, 1/9, 1/9]]);
  //    Gausian blur
  var k = math.matrix([[1/16, 2/16, 1/16],[2/16, 4/16, 2/16],[1/16, 2/16, 1/16]]);
  //    Gausian blur - right motion
  // var k = math.matrix([[1/16, 2/16, 1/16],[2/16, 4/16, 2/16],[0/16, 0/16, 0/16]]);
  //    Edge detection - 
  // var k = math.matrix([[0, 1, 0],[1, -4, 1],[0, 1, 0]]);
  //    Edge detection - 
  // var k = math.matrix([[1, 0, -1],[0, 0, 0],[-1, 0, 1]]);

  // Matrix size
  var _ms = math.size(m);
  var ms = _ms._data[0];
  // 2D convolution
  var out = math.zeros(ms, ms);
  for (let mx = 1; mx < ms-1; mx++) {
    for (let my = 1; my < ms-1; my++) {
      // Get 3x3 sub-matrix from imput matrix
      mss = math.subset(m, math.index(math.range(mx-1,mx+2), math.range(my-1,my+2)));
      // Calculate kernel()
      var v = kernel(k, mss, ks);
      out.subset(math.index(mx, my), v);
    }
  }
  // Get result
  return out;
}

// Kernel, see https://en.wikipedia.org/wiki/Kernel_(image_processing)
function kernel(a, b, s) {
  let v = 0;
    for (let i = 0; i < s; i++) {
      for (let j = 0; j < s; j++) {
        v = v + 
          math.subset(a, math.index(i, j)) * 
          math.subset(b, math.index(i, j));
      }
    }
  return v;
}
