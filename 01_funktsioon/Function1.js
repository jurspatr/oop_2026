// Function 01
function sayHello() {
    return "Hello World";
}
var message1 = sayHello();
console.log(message1);
// Function 02
function multiply(a, b) {
    return a * b;
}
var result = multiply(3, 4);
console.log(result);
// Function 03
// Calculate BMI
function bodyMassIndex(cm, kg) {
    // Step 01: Convert cm to meters
    var m = cm / 100;
    // Step 02: Return BMI value using the formula
    return kg / (m * m);
}
// Input two numbers and print result
console.log(bodyMassIndex(175, 70));
// Array of weights
var weights = [80, 90, 100, 110, 115];
// Calculate BMI using a loop
for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
    var weight = weights_1[_i];
    console.log(bodyMassIndex(180, weight));
}
// Use map to calculate BMI values
var bmiValues = weights.map(function (weight) { return bodyMassIndex(180, weight); });
console.log(bmiValues);
// Function 04
// Alternative BMI formula
function bodyMassIndex2(cm, kg) {
    var m = cm / 100;
    return 1.3 * kg / Math.pow(m, 2.5);
}
// Calculate BMI using the alternative formula
var bmiValues2 = weights.map(function (weight) { return bodyMassIndex2(180, weight); });
console.log(bmiValues2);
// Build a table of results
var results = [];
for (var height = 150; height < 190; height += 2) {
    results.push([
        height,
        bodyMassIndex(height, 90),
        bodyMassIndex2(height, 90)
    ]);
}
console.log(results);
// Function 05
// Calculate the area of a circle
function circleArea(radius) {
    var pi = 3.1415;
    // Area formula: π × r²
    var area = pi * Math.pow(radius, 2);
    // Round to 2 decimal places
    var roundedArea = Math.round(area * 100) / 100;
    return roundedArea;
}
var radius = 10;
var area = circleArea(radius);
console.log("Area of the circle with radius " + radius + " is " + area);
