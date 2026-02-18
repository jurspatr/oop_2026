var Resistor2 = /** @class */ (function () {
    function Resistor2(r, g, 
    //x position where the resistor is going to begin
    startx, 
    //x position where the resistor is going to end
    endx, 
    //how far down the screen we going to draw the resistor. Y increases - diagram goes down
    y) {
        this.r = r;
        this.g = g;
        this.startx = startx;
        this.endx = endx;
        this.y = y;
        this.height = 30;
        this.width = this.endx - this.startx;
        this.draw();
    }
    Resistor2.prototype.draw = function () {
        this.g.clearRect(this.startx, this.y - this.height / 2, this.width, this.height);
        //=========Draw the LEFT wire==========
        this.g.beginPath();
        this.g.moveTo(this.startx, this.y);
        this.g.lineTo(this.startx + this.width / 4, this.y);
        this.g.stroke();
        //start drawing a rectangle
        var bodyX = this.startx + this.width / 4;
        var bodyY = this.y - this.height / 2;
        var bodyW = this.width / 2;
        var bodyH = this.height;
        this.g.beginPath();
        this.g.rect(bodyX, bodyY, bodyW, bodyH);
        this.g.stroke();
        //=========Draw the RIGHT wire==========
        this.g.beginPath();
        this.g.moveTo(this.startx + this.width / 4 * 3, this.y);
        this.g.lineTo(this.endx, this.y);
        this.g.stroke();
        this.g.fillText(this.r + "Ω", bodyX + 10, this.y + 3);
    };
    //Change the resistors resistance value and redraw it
    Resistor2.prototype.setR = function (r) {
        this.r = r;
        this.draw();
    };
    Resistor2.prototype.getR = function () {
        return this.r;
    };
    return Resistor2;
}());
