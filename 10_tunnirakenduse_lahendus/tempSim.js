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
var MaterialAmount = /** @class */ (function () {
    function MaterialAmount(mass, specificHeatCapacity, temperature) {
        this.mass = mass;
        this.specificHeatCapacity = specificHeatCapacity;
        this.temperature = temperature;
    }
    MaterialAmount.prototype.getTemperature = function () {
        return this.temperature;
    };
    MaterialAmount.prototype.changeEnergy = function (energy) {
        var deltaTemperature = energy / (this.mass * this.specificHeatCapacity);
        this.temperature = this.temperature + deltaTemperature;
    };
    MaterialAmount.prototype.getInfluence = function () {
        return this.mass * this.specificHeatCapacity;
    };
    return MaterialAmount;
}());
var AirAmount = /** @class */ (function (_super) {
    __extends(AirAmount, _super);
    function AirAmount(length, width, height, temperature) {
        var mass = length * width * height * AirAmount.air_density;
        return _super.call(this, mass, AirAmount.air_specific_heat_capacity, temperature) || this;
    }
    AirAmount.air_density = 1.23;
    AirAmount.air_specific_heat_capacity = 1012;
    return AirAmount;
}(MaterialAmount));
function equalTemperature(materials) {
    var totalWeightedTemperature = 0;
    var totalInfluence = 0;
    for (var _i = 0, materials_1 = materials; _i < materials_1.length; _i++) {
        var material = materials_1[_i];
        totalWeightedTemperature += material.getTemperature() * material.getInfluence();
        totalInfluence += material.getInfluence();
    }
    return totalWeightedTemperature / totalInfluence;
}
