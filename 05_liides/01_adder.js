var SimpleAdder = /** @class */ (function () {
    function SimpleAdder() {
        this.sum = 0;
    }
    SimpleAdder.prototype.add = function (nr) {
        this.sum += nr;
    };
    SimpleAdder.prototype.getSum = function () {
        return this.sum;
    };
    return SimpleAdder;
}());
var adder1 = new SimpleAdder();
adder1.add(3);
adder1.add(4);
adder1.add(60);
console.log(adder1.getSum());
var CharCounter = /** @class */ (function () {
    //The constructor receives an Adder object and store it in the class
    function CharCounter(adder) {
        this.adder = adder;
    }
    //Count how many characters
    CharCounter.prototype.addWordCharacters = function (word) {
        this.adder.add(word.length);
    };
    //return total character count
    CharCounter.prototype.getCharacter = function () {
        return this.adder.getSum();
    };
    return CharCounter;
}());
var counter1 = new CharCounter(adder1);
counter1.addWordCharacters("hello");
counter1.addWordCharacters("goodbye");
counter1.addWordCharacters("pneumonoultramicroscopicsilicovolcanoconiosis");
console.log(counter1.getCharacter());
