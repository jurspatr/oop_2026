interface Adder {
    //This method will take a number and add to something
    add(nr:number): void;

    //this will method return the current total
    getSum():number;

}

class SimpleAdder implements Adder{
    protected sum:number=0;

    add(nr:number): void {
        this.sum+=nr;
    }

    getSum(): number {
        return this.sum;
    }

}

let adder1: Adder = new SimpleAdder()
adder1.add(3);
adder1.add(4);
adder1.add(60)
console.log(adder1.getSum())

class CharCounter{
    //The constructor receives an Adder object and store it in the class
    constructor(protected adder: Adder){}

    //Count how many characters
    addWordCharacters(word:string): void{
        this.adder.add(word.length);
    }

    //return total character count
    getCharacter(){
        return this.adder.getSum();
    }

}

let counter1: CharCounter = new CharCounter(adder1)
counter1.addWordCharacters("hello")
counter1.addWordCharacters("goodbye")
counter1.addWordCharacters("pneumonoultramicroscopicsilicovolcanoconiosis")
console.log(counter1.getCharacter())