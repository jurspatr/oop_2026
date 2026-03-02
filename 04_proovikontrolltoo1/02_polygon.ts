class Polygon {
    constructor(protected x: number[], protected y: number[]) { }


    //create a method that adds new points to the polygon
    add(x: number, y: number): void {
        this.x.push(x); //add the value of x to the x array
        this.y.push(y); //add the value of y to the y array
    }


    //this method is going to calculate the distance between 2 points
    distance(x1: number, y1: number, x2: number, y2: number): number {
        const a = x2 - x1
        const b = y2 - y1
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }


    //this method calcultes the total length(perimeter) of the polygon
    perimeter(): number {
        let total = 0;
        //start counting at 1 bc we need the previous point.
        // (always need 2 points to measure 1 side).
        // this.x.length: keep looping while i is smaller than the number of points
        for (let i = 1; i < this.x.length; i++) {
            total += this.distance(
                this.x[i - 1],//to find the previous x
                this.y[i - 1],//previous y
                this.x[i],//current x
                this.y[i]//current y
            );


        }


        //Add the distance from the last point back to the first point
        total += this.distance(
            this.x[this.x.length - 1], // last x
            this.y[this.y.length - 1], // last y
            this.x[0],                 // first x
            this.y[0]                  //first y
        );


        return total;
    }




    draw(g: CanvasRenderingContext2D): void {


        //draw a triangle if there are 3 points, a square if there are 4 points, and so on
        //if there are no points stop function
        if (this.x.length === 0) return;
        g.beginPath();
        g.moveTo(this.x[0], this.y[0]); //move to the first point
        for (let i = 1; i < this.x.length; i++) {
            g.lineTo(this.x[i], this.y[i]); //draw a line to the next point
        }

        //move to 
        g.lineTo(this.x[0], this.y[0]);


        g.stroke(); //draw the outline of the shape



    }




}
