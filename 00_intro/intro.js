function setup() {
  createCanvas(640, 480);
  background(100, 1);
  fill(100, 200, 30, 10);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(100, 200, 100, 10);
    stroke(100, 100, 100, 50);
    ellipse(mouseX, mouseY, 80, 80);
  }
}

console.log("test");


