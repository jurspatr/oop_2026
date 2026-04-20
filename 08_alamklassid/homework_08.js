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
// Abstract parent class
var AbstractAnimal = /** @class */ (function () {
    function AbstractAnimal(name, age) {
        this.name = name;
        this.age = age;
    }
    // method shared by all animals
    AbstractAnimal.prototype.move = function () {
        return this.name + " is moving.";
    };
    // method shared by all animals
    AbstractAnimal.prototype.getInfo = function () {
        return this.name + " is " + this.age + " years old.";
    };
    return AbstractAnimal;
}());
// Abstract subclass
var PetAnimal = /** @class */ (function (_super) {
    __extends(PetAnimal, _super);
    function PetAnimal(name, age, owner) {
        var _this = _super.call(this, name, age) || this;
        _this.owner = owner;
        return _this;
    }
    // method for all pet animals
    PetAnimal.prototype.getOwner = function () {
        return this.name + "'s owner is " + this.owner + ".";
    };
    return PetAnimal;
}(AbstractAnimal));
// Real class
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        return this.name + " says: Woof!";
    };
    Dog.prototype.favoriteActivity = function () {
        return this.name + " likes playing fetch.";
    };
    return Dog;
}(PetAnimal));
// Real class
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.makeSound = function () {
        return this.name + " says: Meow!";
    };
    Cat.prototype.favoriteActivity = function () {
        return this.name + " likes sleeping on the sofa.";
    };
    return Cat;
}(PetAnimal));
// Real class
var Parrot = /** @class */ (function (_super) {
    __extends(Parrot, _super);
    function Parrot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parrot.prototype.makeSound = function () {
        return this.name + " says: Hello!";
    };
    Parrot.prototype.favoriteActivity = function () {
        return this.name + " likes talking to people.";
    };
    return Parrot;
}(PetAnimal));
var dog1 = new Dog("Bosse", 3, "Kevin");
var cat1 = new Cat("Sofi", 5, "Patrick");
var parrot1 = new Parrot("Cooper", 2, "Mark");
console.log(dog1.getInfo());
console.log(dog1.makeSound());
console.log(dog1.move());
console.log(dog1.getOwner());
console.log(dog1.favoriteActivity());
console.log("-----");
console.log(cat1.getInfo());
console.log(cat1.makeSound());
console.log(cat1.move());
console.log(cat1.getOwner());
console.log(cat1.favoriteActivity());
console.log("-----");
console.log(parrot1.getInfo());
console.log(parrot1.makeSound());
console.log(parrot1.move());
console.log(parrot1.getOwner());
console.log(parrot1.favoriteActivity());
