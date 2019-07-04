class Car {

    constructor(params) {        
        this.speed = 0;
        this.rotation = 0;
        this.x = 50; 
        this.y = 50;
    }
    
    draw() {
        stroke(80, 80, 100);
        fill(70, 70, 100);
        line(
            this.x, 
            this.y,
            this.x+20, 
            this.y);
    }
}
