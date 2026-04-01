// Abstract class / Parent class
abstract class AbstractResistor {
    abstract getResistance(): number;

    getCurrent(u: number): number {
        return u / this.getResistance();
    }
}

class Resistor extends AbstractResistor {
    r: number;

    constructor(r: number) {
        super();
        this.r = r;
    }

    getResistance(): number {
        return this.r;
    }
}

let resistor1 = new Resistor(220);
console.log("The resistance value of resistor 01: " + resistor1.getResistance());

class Switch extends AbstractResistor {
    on: boolean = false;

    setOn(state: boolean) {
        this.on = state;
    }

    getResistance(): number {
        return this.on ? 0 : 1000000000;
    }

    getCurrent(u: number): number {
        if (u > 0 && this.on) {
            throw new Error("Short circuit");
        }
        return super.getCurrent(u);
    }

    printResistance() {
        console.log("The resistance value of switch 01: " + this.getResistance());
    }
}

let switch1 = new Switch();

console.log("The resistance value of switch 01: " + switch1.getResistance());

switch1.setOn(true);
console.log("The resistance value of switch 01: " + switch1.getResistance());

// Handle the short-circuit case without crashing the whole program
try {
    console.log(switch1.getCurrent(15));
} catch (error: any) {
    console.log(error.message);
}

// current = u / resistance value
// current = 15 / 0 = infinite, but here we treat it as a short circuit

switch1.setOn(false);

// current = 15 / 1000000000 = 0.000000015 = 1.5e-8
console.log(switch1.getCurrent(15));
switch1.printResistance();

abstract class MultipleConnection extends AbstractResistor {
    resistors: AbstractResistor[] = [];

    addResistor(r: AbstractResistor) {
        this.resistors.push(r);
    }
}

class SeriesConnection extends MultipleConnection {
    getResistance(): number {
        let totalResistance = 0;

        for (let r of this.resistors) {
            totalResistance += r.getResistance();
        }

        return totalResistance;
    }
}

class ParallelConnection extends MultipleConnection {
    getResistance(): number {
        let inverseSum = 0;

        for (let r of this.resistors) {
            inverseSum += 1 / r.getResistance();
        }

        return 1 / inverseSum;
    }
}

let s: SeriesConnection = new SeriesConnection();
s.addResistor(new Resistor(220));
s.addResistor(new Resistor(220));


let p:ParallelConnection = new ParallelConnection();
p.addResistor(new Resistor(220));
p.addResistor(new Resistor(220));

console.log("The resistance value of series connection 01: " + s.getResistance() + (" ohms"));
console.log("The resistance value of parallel connection 01: " + p.getResistance() + (" ohms"));


