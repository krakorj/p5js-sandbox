// Matter vars
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
var engine, world, runner, ground;


// Matter object vars
var holder, string, body;

// Others
var score = 0;

function setup() {
    var canvas = createCanvas(400, 400);

    // Init Matter
    engine = Engine.create();
    world = engine.world;
    runner = Runner.create();
    
    // Init objects
    //  Holder
    holder = Bodies.circle(width/2, 150, 5, { isStatic: true });
    //  Body
    body = Bodies.polygon(width/2, 260, 5, 30);
    //  String
    string = Constraint.create({
        bodyA: holder,
        bodyB: body,
        stiffness: 1
    });
    //  Ground
    ground = Bodies.rectangle(width/2, height, width, 10, { isStatic: true })
    
    //  Add objects to world
    World.add(world, [holder, string, body, ground]);

    // Add mouse interaction
    var mouse = Mouse.create(canvas.elt);
    var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                // allow bodies on mouse to rotate
                angularStiffness: 1,
                render: {
                    visible: false
                }
            }
        });
    World.add(world, mouseConstraint);

    //console.log(world);
}

function draw() {
    background(150);

    // Action
    var t = engine.timing.timestamp/1000;
    var freq = 0.5;
    var amp = 50;
    holderAction(t, freq, amp);

    // Render bodies
    let bodies = world.bodies;
    bodies.forEach(function(i) {
        showBodies(i)
    });
    // Render constraints
    showConstraint(world.constraints[0]);

    // Tick the runner
    Runner.tick(runner, engine, 1);

    // Print info
    var s = "x,y: " + Math.round(body.position.x) + " , " + Math.round(body.position.y);
    text(s, 10, 30);
    var s = "time: " + Math.round(t) + " sec";
    text(s, 10, 45);
    var s = "score: " + score;
    text(s, 10, 60);

    // Score
    score = Math.round(Math.max(score, 260 - body.position.y));
    
    //console.log(runner); noLoop();
}

function showBodies(obj){
    beginShape();
    var vertices = obj.vertices;
    vertices.forEach(i => {
        vertex(i.x, i.y);
    });
    endShape(CLOSE);
}

function showConstraint(obj){
    line(obj.bodyA.position.x,
        obj.bodyA.position.y,
        obj.bodyB.position.x,
        obj.bodyB.position.y);
}

function holderAction(t, freq, amp){
    var omega = 2*Math.PI*freq;
    Body.setPosition( holder,
        {
            x: width/2 + amp*Math.sin(t*omega),
            y: 150
        });
}
