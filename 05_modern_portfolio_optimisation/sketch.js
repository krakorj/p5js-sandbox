var table;
var img;

function preload(){
}

function setup() {
    var canvas = createCanvas(600, 450);
    canvas.parent('sketch-holder');
    img = loadImage("mpt.png");  // Load the image
}

function draw() {
    image(img, 0, 0);
}
