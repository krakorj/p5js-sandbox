/*
% Solving the 2-D Poisson equation by the Finite Difference
...Method 
% Numerical scheme used is a second order central difference in space
...(5-point difference)

%%
%Specifying parameters
nx=80;                           %Number of steps in space(x)
ny=80;                           %Number of steps in space(y)       
niter=1000;                      %Number of iterations 
dx=2/(nx-1);                     %Width of space step(x)
dy=2/(ny-1);                     %Width of space step(y)
x=0:dx:2;                        %Range of x(0,2) and specifying the grid points
y=0:dy:2;                        %Range of y(0,2) and specifying the grid points
b=zeros(nx,ny);                  %Preallocating b
pn=zeros(nx,ny);                 %Preallocating pn

%%
% Initial Conditions
p=zeros(nx,ny);                  %Preallocating p

%%
%Boundary conditions
p(:,1)=0;
p(:,ny)=0;
p(1,:)=0;                  
p(nx,:)=0;

%%
%Source term
b(round(ny/4),round(nx/4))=3000;
b(round(ny*3/4),round(nx*3/4))=-3000;

%%
i=2:nx-1;
j=2:ny-1;
%Explicit iterative scheme with C.D in space (5-point difference)
for it=1:niter
    pn=p;
    p(i,j)=((dy^2*(pn(i+1,j)+pn(i-1,j)))+(dx^2*(pn(i,j+1)+pn(i,j-1)))-(b(i,j)*dx^2*dy*2))/(2*(dx^2+dy^2));
    %Boundary conditions 
    p(:,1)=0;
    p(:,ny)=0;
    p(1,:)=0;                  
    p(nx,:)=0;
end

%%
%Plotting the solution
h=surf(x,y,p','EdgeColor','none');       
shading interp
axis([-0.5 2.5 -0.5 2.5 -100 100])
title({'2-D Poisson equation';['{\itNumber of iterations} = ',num2str(it)]})
xlabel('Spatial co-ordinate (x) \rightarrow')
ylabel('{\leftarrow} Spatial co-ordinate (y)')
zlabel('Solution profile (P) \rightarrow')

*/
var nx = 40;
var ny = 20;
var dx = 1;
var dy = 1;
var niter = 10;
var p = null;
var pn = null;
var b = null;

// The statements in the setup() function 
// execute once when the program begins
function setup() {
    canvas = createCanvas(720, 400);  // Size must be the first statement
    canvas.parent('sketch-holder');
    // color mode
    colorMode(HSB, 100);
    // allocate memory
    p = initArray(p);
    pn = initArray(pn);
    b = initArray(b);
    // Init array
    b = initPotential(b);
    frameRate(20);
}
// The statements in draw() are executed until the 
// program is stopped. Each statement is executed in 
// sequence and after the last line is read, the first 
// line is executed again.
function draw() {
    // Set the background to black
    background(0,0,100);
    // Calculate potential changes
    for (var i = 0; i < niter; i++) {
        pn = calculatePotential(p)
        drawField(p);
    }
    
}

function calculatePotential(p) {
    for (var x = 1; x < nx-1; x++) {
        for (var y = 1; y < ny-1; y++) {
            dx2 = dx^2;
            dy2 = dy^2;
            f1 = (dy2*(pn[x+1][y]+pn[x-1][y]));
            f2 = (dx2*(pn[x][y+1]+pn[x][y-1]));
            f3 = (b[x][y]*dx2*dy2);
            p[x][y]=(f1+f2-f3)/(2*(dx2+dy2));
            //
            p[x][0]=0;
            p[0][y]=0;
            p[x][ny-1]=0;
            p[nx-1][y]=0;
        }
    }
    return p
}

function initPotential(p) {
    // Set init
    for (let i = 0; i < 10; i++) {
        x = Math.floor(Math.random() * nx);
        y = Math.floor(Math.random() * ny);
        v = Math.floor(Math.random() * 50);
        p[x][y] = -v;
    }
    return p;
}

function drawField(color){
    var size = (width/nx);
    for (let x = 0; x < nx; x++) {
        for (let y = 0; y < ny; y++) {
            stroke(50, 10, 100);
            fill(color[x][y], color[x][y], 100);
            rect(x*size, y*size, size-1, size-1);
        }
    }
}

function initArray(x){
    // Create array
    x = new Array(nx);
    for (var i = 0; i < nx; i++) {
        x[i] = new Array(ny);
    }
    // Zeroes
    for (var i = 0; i < nx; i++) {
        for (var j = 0; j < ny; j++) {
            x[i][j] = 0;
        }
    }
    return x;
}
