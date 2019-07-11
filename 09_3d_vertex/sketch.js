// Parameters
// Parameters
var mi = 45; // nadhled
var fi = 45; // otoceni
var xj = 0.1; var yj = 0.1; var zj = 100; // jednotky
var sx = 8; var sy = 8; var sz = 0; // posun
var h = 10;
let mxo = 0.0;
let myo = 0.0;

// The statements in the setup() function 
// execute once when the program begins
function setup() {
    canvas = createCanvas(320, 320, WEBGL);  // Size must be the first statement
    canvas.parent('sketch-holder');
    // color mode
    colorMode(RGB, 100);
}

// Fce to draw
function fce(x,y) {
    x = x*xj;
    y = y*yj;
    // -----------------
    // z = pow((sin(x)+sin(y)),3)/3;
    // z = sin(pow(x,2)+pow(y,2));
    // z = (abs(x)+abs(y))/4;
    z = sin(pow(x,2)+pow(y,2))/(pow(x,2)+pow(y,2));
    // z = 4*sqrt(pow(x,2)+pow(y,2))/(pow(x,2)+pow(y,2));
    // -----------------    
    z = z*zj;
    return z
}

// Draw
function draw() {
    clear();
    background(50);
    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;
    ambientLight(100, 100, 100);
    pointLight(80, 100, 100, 50, 50, 50);
    
    //noStroke();
    stroke(80, 80, 80, 80);
    translate(0, 0);
    rotateX(mi);
    rotateZ(fi);
    for (let i = -10; i < 10; i++) {
        for (let j = -10; j < 10; j++) {
            beginShape();
            x1 = i*h; y1 = j*h; z1 = fce(x1,y1);
            x2 = (i+1)*h; y2 = j*h; z2 = fce(x2,y2);
            x3 = (i+1)*h; y3 = (j+1)*h; z3 = fce(x3,y3);
            x4 = i*h; y4 = (j+1)*h; z4 = fce(x4,y4);
            c = map(z1, -0.08, 0.1, 0, 255)
            specularMaterial(70)
            vertex(x1, y1, z1);
            vertex(x2, y2, z2);
            vertex(x3, y3, z3);
            vertex(x4, y4, z4);
            endShape(CLOSE);
        }
    }
}

// Mouse interaction - rotate
var origfi, origmi;

function mousePressed() {
    mxo = map(mouseX, 0, width, -180, 180);
    myo = map(mouseY, 0, width, -180, 180);
    origfi = fi;
    origmi = mi;
}

function mouseDragged() {
    mx = map(mouseX, 0, width, -180, 180);
    my = map(mouseY, 0, height, -180, 180);
    dfi = round((mx - mxo));
    dmi = round((my - myo));
    fi = origfi + radians(dfi);
    mi = origmi + radians(dmi);
}

// Wheel - zoom
function mouseWheel(event) {
    xj += 0.01*event.delta/133;
    yj += 0.01*event.delta/133;
    zj += 0.01*event.delta/133;
    console.log(xj + "," + yj + "," + zj);
}

// Keyboard - X/Y shift
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        sx += -1;
    } else if (keyCode === RIGHT_ARROW) {
        sx += 1;
    } else if (keyCode === UP_ARROW) {
        sy += -1;
    } else if (keyCode === DOWN_ARROW) {
        sy += 1;
    }
    console.log(sx + "," + sy);
}


