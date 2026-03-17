//shift + alt + down arrow/up arrow; ctrl + d
//
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Coder = /** @class */ (function () {
    //secondLang!: string
    function Coder(name, music, age, // private can only be accessed inside this class
    lang //optional //can be accessed in a class
    ) {
        if (lang === void 0) { lang = 'Typescript'; }
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    Coder.prototype.getAge = function () {
        return "Hello, Im ".concat(this.age);
    };
    return Coder;
}());
var Dave = new Coder('Dave', 'Rock', 42);
console.log(Dave.getAge()); //sobib kuna klassis on see method
//console.log(Dave.Age) //ei sobi kuna age on ise private
//console.log(Dave.lang)
var WebDev = /** @class */ (function (_super) {
    __extends(WebDev, _super);
    function WebDev(computer, name, music, age) {
        var _this = _super.call(this, name, music, age) || this;
        _this.computer = computer;
        _this.computer = computer;
        return _this;
    }
    WebDev.prototype.getLang = function () {
        return "I write ".concat(this.lang);
    };
    return WebDev;
}(Coder));
var sara = new WebDev('Mac', 'Sara', 'Rock', 21);
console.log(sara.getLang());
console.log(sara.getAge());
var Guitarist = /** @class */ (function () {
    function Guitarist(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    Guitarist.prototype.play = function (action) {
        return "".concat(this.name, " ").concat(action, " the ").concat(this.instrument);
    };
    return Guitarist;
}());
var Page = new Guitarist('Jimmy', 'guitar');
console.log(Page.play('strums'));
//////////////////////
var Peeps = /** @class */ (function () {
    function Peeps(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count;
    }
    Peeps.getCount = function () {
        return Peeps.count;
    };
    Peeps.count = 0;
    return Peeps;
}());
var John = new Peeps('John');
var Steve = new Peeps('Steve');
var Amy = new Peeps('Amy');
console.log(Amy.id);
console.log(Steve.id);
console.log(Peeps.count);
///////////////////////////
var Bands = /** @class */ (function () {
    function Bands() {
        this.dataState = [];
    }
    Object.defineProperty(Bands.prototype, "Data", {
        get: function () {
            return this.dataState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bands.prototype, "data", {
        set: function (value) {
            if (Array.isArray(value) && value.every(function (el) { return typeof el === 'string'; })) {
                this.dataState = value;
                return;
            }
            else
                throw new Error('Param is not an array of strings');
        },
        enumerable: false,
        configurable: true
    });
    return Bands;
}());
var MyBands = new Bands();
MyBands.data = ['Neil Young', 'Led Zep'];
console.log(MyBands.data);
MyBands.data = __spreadArray(__spreadArray([], MyBands.data, true), ['ZZ Top'], false);
console.log(MyBands.data);
