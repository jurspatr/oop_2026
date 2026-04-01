var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Abstract class / Parent class
var AbstractResistor = /** @class */ (function () {
    function AbstractResistor() {
    }
    AbstractResistor.prototype.getCurrent = function (u) {
        return u / this.getResistance();
    };
    return AbstractResistor;
}());
var Resistor = /** @class */ (function (_super) {
    __extends(Resistor, _super);
    function Resistor(r) {
        var _this = _super.call(this) || this;
        _this.r = r;
        return _this;
    }
    Resistor.prototype.getResistance = function () {
        return this.r;
    };
    return Resistor;
}(AbstractResistor));
var resistor1 = new Resistor(220);
console.log("The resistance value of resistor 01: " + resistor1.getResistance());
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.on = false;
        return _this;
    }
    Switch.prototype.setOn = function (state) {
        this.on = state;
    };
    Switch.prototype.getResistance = function () {
        return this.on ? 0 : 1000000000;
    };
    Switch.prototype.getCurrent = function (u) {
        if (u > 0 && this.on) {
            throw new Error("Short circuit");
        }
        return _super.prototype.getCurrent.call(this, u);
    };
    Switch.prototype.printResistance = function () {
        console.log("The resistance value of switch 01: " + this.getResistance());
    };
    return Switch;
}(AbstractResistor));
var switch1 = new Switch();
console.log("The resistance value of switch 01: " + switch1.getResistance());
switch1.setOn(true);
console.log("The resistance value of switch 01: " + switch1.getResistance());
// Handle the short-circuit case without crashing the whole program
try {
    console.log(switch1.getCurrent(15));
}
catch (error) {
    console.log(error.message);
}
// current = u / resistance value
// current = 15 / 0 = infinite, but here we treat it as a short circuit
switch1.setOn(false);
// current = 15 / 1000000000 = 0.000000015 = 1.5e-8
console.log(switch1.getCurrent(15));
switch1.printResistance();
var MultipleConnection = /** @class */ (function (_super) {
    __extends(MultipleConnection, _super);
    function MultipleConnection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resistors = [];
        return _this;
    }
    MultipleConnection.prototype.addResistor = function (r) {
        this.resistors.push(r);
    };
    return MultipleConnection;
}(AbstractResistor));
var SeriesConnection = /** @class */ (function (_super) {
    __extends(SeriesConnection, _super);
    function SeriesConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesConnection.prototype.getResistance = function () {
        var totalResistance = 0;
        for (var _i = 0, _a = this.resistors; _i < _a.length; _i++) {
            var r = _a[_i];
            totalResistance += r.getResistance();
        }
        return totalResistance;
    };
    return SeriesConnection;
}(MultipleConnection));
var ParallelConnection = /** @class */ (function (_super) {
    __extends(ParallelConnection, _super);
    function ParallelConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParallelConnection.prototype.getResistance = function () {
        var inverseSum = 0;
        for (var _i = 0, _a = this.resistors; _i < _a.length; _i++) {
            var r = _a[_i];
            inverseSum += 1 / r.getResistance();
        }
        return 1 / inverseSum;
    };
    return ParallelConnection;
}(MultipleConnection));
var s = new SeriesConnection();
s.addResistor(new Resistor(220));
s.addResistor(new Resistor(220));
var p = new ParallelConnection();
p.addResistor(new Resistor(220));
p.addResistor(new Resistor(220));
console.log("The resistance value of series connection 01: " + s.getResistance() + (" ohms"));
console.log("The resistance value of parallel connection 01: " + p.getResistance() + (" ohms"));
