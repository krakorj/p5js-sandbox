// Parameters
var mi = 45; // nadhled
var fi = 45; // otoceni
var xj = 0.4; var yj = 0.4; var zj = 0.4; // jednotky
var sx = 8; var sy = 8; var sz = 0; // posun
var h = 10;
let mxo = 0.0;
let myo = 0.0;

// The statements in the setup() function 
// execute once when the program begins
function setup() {
    canvas = createCanvas(320, 320);  // Size must be the first statement
    canvas.parent('sketch-holder');
    // color mode
    colorMode(HSB, 100);
    textSize(10);
    frameRate(30);
    noLoop();
    // var update
    sx = -1*sx; sy = -1*sy;
    fi = radians(fi); mi = radians(mi);
}

// Fce to draw
function fce(a,b) {
    x = a*xj;
    y = b*yj;
    // -----------------
    // z = pow((sin(x)+sin(y)),3)/3;
    // z = sin(pow(x,2)+pow(y,2));
    // z = (abs(x)+abs(y))/4;
    z = sin(pow(x,2)+pow(y,2))/(pow(x,2)+pow(y,2));
    // z = 4*sqrt(pow(x,2)+pow(y,2))/(pow(x,2)+pow(y,2));
    // -----------------
    z = (10*z/zj+10*sz)*sin(radians(90)-mi);
    return z
}

// Draw
function draw() {
    // Draw mode
    stroke(80, 80, 100);
    fill(70, 70, 100);
    // Natoceni
    a1 = 160 + 65*sin(fi) - 85*cos(fi);
    a2 = 95 + sin(mi)*(65*cos(fi) + 85*sin(fi));
    a2 = a2+1/4*(190-a2)
    // if (a1 < 0 || a1 > 319 || a2 < 0 || a2 > 192) console.log("OK");
    // Ramecek
    line(0, 0, 319, 0);
    line(319, 0, 319, 191);
    line(319, 191, 0, 191);
    line(0, 191, 0, 0);
    // Osy X,Y
    wx = a1 - 170*sin(fi);
    wy = a2 - 170*cos(fi)*sin(mi);
    wwx = a1 + 170*cos(fi);
    wwy = a2 - 170*sin(fi)*sin(mi);
    line(a1, a2, wx, wy);
    line(a1, a2, wwx, wwy);
    text(`x`, wx-10, wy);
    text(`y`, wwx+10, wwy+2);
    // Krivky ve smeru Y
    for (let a = 0+sx; a <= 16+sx; a++) {
        ne = 1;
        for (let b = 0+sy; b <= 16+sy; b++) {
            x0 = a1 + (a-sx)*10*cos(fi);
            y0 = a2 - (a-sx)*10*sin(fi)*sin(mi);
            z = fce(a,b);
            x1 = x0 - (b-sy)*10*cos(radians(90)-fi);
            y1 = y0 - (b-sy)*10*sin(radians(90)-fi)*sin(mi)-z;
            if (ne == 1) {
                xo = x0; yo = y0;
                ne = 0;
            }
            line(xo, yo, x1, y1);
            xo = x1; yo = y1;
        }
    }
    // Krivky ve smeru X
    for (let b = 0+sy; b <= 16+sy; b++) {
        ne = 1;
        for (let a = 0+sx; a <= 16+sx; a++) {
            x0 = a1 + (a-sx)*10*cos(fi);
            y0 = a2 - (a-sx)*10*sin(fi)*sin(mi);
            z = fce(a,b);
            x1 = x0 - (b-sy)*10*cos(radians(90)-fi);
            y1 = y0 - (b-sy)*10*sin(radians(90)-fi)*sin(mi)-z;
            if (ne == 1) {
                xo = x1; yo = y1;
                ne = 0;
            }
            line(xo, yo, x1, y1);
            xo = x1; yo = y1;
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
    clear();
    redraw();
}

// Wheel - zoom
function mouseWheel(event) {
    xj += 0.01*event.delta/133;
    yj += 0.01*event.delta/133;
    zj += 0.01*event.delta/133;
    console.log(xj + "," + yj + "," + zj);
    clear();
    redraw();
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
    clear();
    redraw();
}


