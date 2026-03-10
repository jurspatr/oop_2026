var CmToIn = /** @class */ (function () {
    function CmToIn() {
    }
    CmToIn.prototype.calculate = function (cm) {
        return cm / 2.54;
    };
    CmToIn.prototype.inPutUnit = function () {
        return "cm";
    };
    CmToIn.prototype.outPutUnit = function () {
        return "in";
    };
    return CmToIn;
}());
