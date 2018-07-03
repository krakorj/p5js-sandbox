let xs = [];
let ys = [];

let a, b, c, d;
const learningRate = 0.2;
const optimizer = tf.train.adam(learningRate);

function setup() {
    createCanvas(600, 400);
    background(50);
    a = tf.variable(tf.scalar(Math.random()));
    b = tf.variable(tf.scalar(Math.random()));
    c = tf.variable(tf.scalar(Math.random()));
    d = tf.variable(tf.scalar(Math.random()));
}

function mousePressed() {
    let x = map(mouseX, 0 , width, -1, 1);
    let y = map(mouseY, 0 , height, 1, -1);
    xs.push(x);
    ys.push(y);
    background(50);
}

function draw() {
    //
    if(xs.length > 0) {
        const ystf = tf.tensor1d(ys);
        const xstf = tf.tensor1d(xs);
        optimizer.minimize(() => {
            const predsYs = predict(xstf);
            return loss(predsYs, ystf);
        });
    } else {
        return;
    }

    // Draw points
    stroke(255);
    strokeWeight(4);
    for (let i = 0; i < xs.length; i++) {
        let px = map(xs[i], -1 , 1, 0, width);
        let py = map(ys[i], -1 , 1, height, 0);
        point(px, py);
    }

    // Draw spline
    const curveX = [];
    for (let x = -1; x <= 1; x += 0.1) {
        curveX.push(x);
    }
    const xp = tf.tensor1d(curveX);
    const yp = tf.tidy(() => predict(xp));
    let curveY = yp.dataSync();
    yp.dispose();

    // 
    beginShape();
    noFill();
    stroke(255, 10);
    strokeWeight(1);
    for (let i = 0; i < curveX.length; i++) {
        let x = map(curveX[i], -1, 1, 0, width);
        let y = map(curveY[i], -1, 1, height, 0);
        vertex(x, y);
    }
    endShape();
}

function predict(x) {
    // y = a * x ^ 3 + b * x ^ 2 + c * x + d
    return tf.tidy(() => {
      return a.mul(x.pow(tf.scalar(3))) // a * x^3
        .add(b.mul(x.square())) // + b * x ^ 2
        .add(c.mul(x)) // + c * x
        .add(d); // + d
    });
}

function loss(predictions, labels) {
    // Subtract our labels (actual values) from predictions, square the results,
    // and take the mean.
    const meanSquareError = predictions.sub(labels).square().mean();
    return meanSquareError;
}
