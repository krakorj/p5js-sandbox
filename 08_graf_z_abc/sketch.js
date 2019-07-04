// Parameters
var mi = 45; // nadhled
var fi = 45; // otoceni
var xj = 0.3; var yj = 0.3; var zj = 0.6; // jednotky
var sx = 2; var sy = 2; var sz = 0; // posun
var h = 10;

// The statements in the setup() function 
// execute once when the program begins
function setup() {
    canvas = createCanvas(320, 320);  // Size must be the first statement
    canvas.parent('sketch-holder');
    // color mode
    colorMode(HSB, 100);
    textSize(10);
    noLoop();
}

// Fce to draw
function fce(a,b) {
    x = a*xj;
    y = b*yj;
    // -----------------
    // z = pow((sin(x)+sin(y)),3);
    z = pow((sin(x)+sin(y)),3);
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
    fi = radians(fi);
    mi = radians(mi);
    a1 = 160 + 65*sin(fi) - 85*cos(fi);
    a2 = 95 + sin(mi)*(65*cos(fi) + 85*sin(fi));
    a2 = a2+1/4*(190-a2)
    if (a1 < 0 || a1 > 319 || a2 < 0 || a2 > 192)
        console.log("OK");
    // Posunuti pocatku
    sx = -1*sx; 
    sy = -1*sy;
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

// Mouse interaction
function mouseDragged() {
    fi = mouseX*0.3;
    mi = mouseY*0.3;
    clear();
    redraw();
}

