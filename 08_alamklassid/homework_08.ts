// Abstract parent class
abstract class AbstractAnimal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // method make a sound
    abstract makeSound(): string;

    // method shared by all animals
    move(): string {
        return this.name + " is moving.";
    }

    // method shared by all animals
    getInfo(): string {
        return this.name + " is " + this.age + " years old.";
    }
}

// Abstract subclass
abstract class PetAnimal extends AbstractAnimal {
    owner: string;

    constructor(name: string, age: number, owner: string) {
        super(name, age);
        this.owner = owner;
    }

    // method for all pet animals
    getOwner(): string {
        return this.name + "'s owner is " + this.owner + ".";
    }

    // Another method
    abstract favoriteActivity(): string;
}

// Real class
class Dog extends PetAnimal {
    makeSound(): string {
        return this.name + " says: Woof!";
    }

    favoriteActivity(): string {
        return this.name + " likes playing fetch.";
    }
}

// Real class
class Cat extends PetAnimal {
    makeSound(): string {
        return this.name + " says: Meow!";
    }

    favoriteActivity(): string {
        return this.name + " likes sleeping on the sofa.";
    }
}

// Real class
class Parrot extends PetAnimal {
    makeSound(): string {
        return this.name + " says: Hello!";
    }

    favoriteActivity(): string {
        return this.name + " likes talking to people.";
    }
}


let dog1 = new Dog("Bosse", 3, "Kevin");
let cat1 = new Cat("Sofi", 5, "Patrick");
let parrot1 = new Parrot("Cooper", 2, "Mark");

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