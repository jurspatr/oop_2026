//function to calculate the average of three numbers
function threeNumberAverage(a, b, c) {
    return (a + b + c) / 3;
}
console.log(threeNumberAverage(10, 15, 20));
//function for calculating the average of the numbers in the array
function avgArray(numberarray) {
    var sum = 0;
    for (var i = 0; i < numberarray.length; i++) {
        sum = sum + numberarray[i];
    }
    return sum / numberarray.length;
}
console.log(avgArray([10, 15, 20, 25, 37]));
//function for calculating the average of the numbers in the array shorter
function avgArray2(numberarray) {
    return numberarray.reduce(function (s, v) { return s + v; }, 0) / numberarray.length;
    //s = sum
    // v = current value
    //0=starting value of the sum 
}
console.log(avgArray2([10, 15, 20, 25, 37]));
//taking the sliding average of three numbers
function slidingAverage(arr) {
    var result = [];
    for (var i = 0; i < arr.length - 2; i++) {
        result.push(threeNumberAverage(arr[i], arr[i + 1], arr[i + 2]));
    }
    return result;
}
console.log(slidingAverage([2, 5, 6, 9, 12, 23, 45]));
function slidingAverage1(arr, windowSize) {
    if (windowSize === void 0) { windowSize = 2; }
    var out = [];
    for (var i = 0; i < arr.length - windowSize + 1; i++) {
        out.push(avgArray(arr.slice(i, i + windowSize))); //sulgudes olev osa on vahemik, mille keskmist arvutame
    }
    return out;
}
console.log(slidingAverage1([2, 5, 6, 9, 12, 23, 45], 4)); //saab ka panna erineva akna suuruse sulgudesse, 3 on akna suurus, mis määrab, mitu numbrit keskmistatakse korraga. Kui see on 3, siis arvutatakse kolme järjestikuse numbri keskmine.
