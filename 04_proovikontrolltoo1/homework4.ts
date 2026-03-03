class Circle {
    // Properties of the circle
    x: number;
    y: number;
    radius: number;
    color: string;

    //Constructor to initialize the circle's properties
    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y
        this.radius = radius;
        this.color = color;
    }


    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath(); //Start a new path
        //Using arc() method to define the circle
        // arc(x, y, radius, startAngle, endAngle, counterclockwise)
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill(); //Fill the circle with the specified color
        ctx.closePath();
    }

}

//main function to get the canvas context and draw the circle
function drawCircle(): void {
    const canvas = document.getElementById('circleCanvas') as HTMLCanvasElement;
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        //check - getContext() can return null if 2D unsupported
        if (!ctx) {
            console.error('Failed to get 2D context.')
            return;
        }


        //Create an instance of the Circle class
        const myCircle = new Circle(
            canvas.width / 2, //Center X position
            canvas.height / 2, //center Y position
            50, //radius
            'red' //color
        );

        //draw the circle using the class
        myCircle.draw(ctx);
    } else {
        console.error('Canvas is not supported in this browser.')


    }
}

window.onload = drawCircle