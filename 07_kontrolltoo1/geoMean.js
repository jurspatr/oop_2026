var GeometricMean = /** @class */ (function () {
    function GeometricMean() {
    }
    GeometricMean.prototype.squareRoot = function (nr1, nr2) {
        return Math.sqrt(nr1 * nr2);
    };
    GeometricMean.prototype.sqrtArr = function (arr) {
        var multiplication = 1;
        for (var i = 0; i < arr.length; i++) {
            multiplication *= arr[i];
        }
        return Math.pow(multiplication, 1 / arr.length);
    };
    GeometricMean.prototype.updateCoeff = function (changePercent) {
        return changePercent;
    };
    return GeometricMean;
}());
