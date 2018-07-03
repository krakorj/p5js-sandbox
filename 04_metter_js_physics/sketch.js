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
    Bodies = Matter.Bodies;
var engine, world, runner, ground;


// Object vars
var holder, string, body;

function setup() {
    var canvas = createCanvas(400, 400);

    // Init Matter
    engine = Engine.create();
    world = engine.world;
    runner = Runner.create();
    
    // Init objects
    //  Holder
    holder = Bodies.circle(150, 150, 5, { isStatic: true });
    //  Body
    body = Bodies.polygon(100, 50, 5, 30);
    //  String
    string = Constraint.create({
        bodyA: holder,
        pointA: { x: -10, y: -10 },
        bodyB: body,
        pointB: { x: -10, y: -10 },
        stiffness: 0.5
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

    //
    console.log(world);
}



function draw() {
    background(100);

    // Render bodies
    let bodies = world.bodies;
    bodies.forEach(function(i) {
        showBodies(i)
    });
    // Render constraints
    showConstraint(world.constraints[0]);

    // Tick the runner
    Runner.tick(runner, engine, 1);
    
    //console.log(world); noLoop();
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
