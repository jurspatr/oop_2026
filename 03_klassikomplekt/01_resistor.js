var Resistor = /** @class */ (function () {
    function Resistor(r, g) {
        this.r = r;
        this.g = g;
        this.draw();
    }
    Resistor.prototype.draw = function () {
        //start drawing a new shape
        this.g.beginPath();
        //50- x position(distance from the left of the canvas)
        //10- y position(distance from top of the canvas)
        //100- width of the rectangle
        //30- height of the rectangle
        this.g.rect(50, 10, 100, 30);
        this.g.stroke();
        //fillText(text,x,y)
        this.g.fillText("" + this.r, 80, 28);
    };
    return Resistor;
}());
