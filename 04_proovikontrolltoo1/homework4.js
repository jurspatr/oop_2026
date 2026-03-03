var Circle = /** @class */ (function () {
    //Constructor to initialize the circle's properties
    function Circle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    Circle.prototype.draw = function (ctx) {
        ctx.beginPath(); //Start a new path
        //Using arc() method to define the circle
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill(); //Fill the circle with the specified color
        ctx.closePath();
    };
    return Circle;
}());
//main function to get the canvas context and draw the circle
function drawCircle() {
    var canvas = document.getElementById('circleCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //Create an instance of the Circle class
        var myCircle = new Circle(canvas.width / 2, //Center X position
        canvas.height / 2, //center Y position
        50, //radius
        'red' //color
        );
        //draw the circle using the class
        myCircle.draw(ctx);
    }
    else {
        console.error('Canvas is not supported in this browser.');
    }
}
window.onload = drawCircle;
