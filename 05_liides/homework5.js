var EurToDollar = /** @class */ (function () {
    function EurToDollar() {
    }
    EurToDollar.prototype.calculate = function (euro) {
        return euro * 1.1640;
    };
    EurToDollar.prototype.inputUnit = function () {
        return "€";
    };
    EurToDollar.prototype.outputUnit = function () {
        return "$";
    };
    return EurToDollar;
}());
var DollarToEur = /** @class */ (function () {
    function DollarToEur() {
    }
    DollarToEur.prototype.calculate = function (dollars) {
        return dollars * 0.8591;
    };
    DollarToEur.prototype.inputUnit = function () {
        return "$";
    };
    DollarToEur.prototype.outputUnit = function () {
        return "€";
    };
    return DollarToEur;
}());
var DollarToPound = /** @class */ (function () {
    function DollarToPound() {
    }
    DollarToPound.prototype.calculate = function (dollars) {
        return dollars * 0.7437;
    };
    DollarToPound.prototype.inputUnit = function () {
        return "$";
    };
    DollarToPound.prototype.outputUnit = function () {
        return "£";
    };
    return DollarToPound;
}());
var PoundToDollar = /** @class */ (function () {
    function PoundToDollar() {
    }
    PoundToDollar.prototype.calculate = function (pounds) {
        return pounds * 1.3446;
    };
    PoundToDollar.prototype.inputUnit = function () {
        return "£";
    };
    PoundToDollar.prototype.outputUnit = function () {
        return "$";
    };
    return PoundToDollar;
}());
var EurToPound = /** @class */ (function () {
    function EurToPound() {
    }
    EurToPound.prototype.calculate = function (euro) {
        return euro * 0.8652;
    };
    EurToPound.prototype.inputUnit = function () {
        return "€";
    };
    EurToPound.prototype.outputUnit = function () {
        return "£";
    };
    return EurToPound;
}());
var PoundToEur = /** @class */ (function () {
    function PoundToEur() {
    }
    PoundToEur.prototype.calculate = function (pounds) {
        return pounds * 1.1558;
    };
    PoundToEur.prototype.inputUnit = function () {
        return "£";
    };
    PoundToEur.prototype.outputUnit = function () {
        return "€";
    };
    return PoundToEur;
}());
