var table;
var img;

function preload(){
}

function setup() {
    var canvas = createCanvas(400, 400);
    img = loadImage("mpt.png");  // Load the image
}

function draw() {
    image(img, 0, 0);
}
