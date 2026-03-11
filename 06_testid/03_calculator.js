"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.panel = "";
    }
    Calculator.prototype.pressButton = function (b) {
        if (b === "=") {
            try {
                // We use Function instead of eval for better compatibility
                // It evaluates the string (e.g., "7+5") and returns the result
                var result = new Function("return ".concat(this.panel))();
                this.panel = String(result);
            }
            catch (e) {
                this.panel = "Error";
            }
        }
        else if (b === "C") {
            // Clears the display
            this.panel = "";
        }
        else {
            // Appends numbers or operators (+, -)
            this.panel += b;
        }
    };
    Calculator.prototype.getPanelContent = function () {
        return this.panel;
    };
    return Calculator;
}());
exports.Calculator = Calculator;
if (typeof window !== 'undefined') {
    window.Calculator = Calculator;
}
