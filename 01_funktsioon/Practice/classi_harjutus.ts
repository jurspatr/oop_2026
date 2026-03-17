//shift + alt + down arrow/up arrow; ctrl + d
//

class Coder {

    //secondLang!: string

    constructor(
        public readonly name:string, 
        public music:string, 
        private age:number, // private can only be accessed inside this class
        protected lang:string = 'Typescript' //optional //can be accessed in a class
    ) {
        this.name = name
        this.music = music
        this.age = age
        this.lang = lang
    }

    public getAge(){
        return `Hello, Im ${this.age}`
    }
}

const Dave = new Coder('Dave', 'Rock', 42)
console.log(Dave.getAge()) //sobib kuna klassis on see method
//console.log(Dave.Age) //ei sobi kuna age on ise private
//console.log(Dave.lang)

class WebDev extends Coder{
    constructor(
        public computer: string,
        name: string,
        music:string,
        age:number 
    ){
        super(name, music, age)
        this.computer = computer
    }

    public getLang() {
        return `I write ${this.lang}`
    }
}

const sara = new WebDev('Mac', 'Sara', 'Rock', 21)
console.log(sara.getLang())
console.log(sara.getAge())

////////////////////////////////////////////////


interface Musician {
    name: string,
    instrument: string,
    play(action: string):string
}

class Guitarist implements Musician{
    name:string
    instrument:string

    constructor(name:string, instrument:string){
        this.name = name
        this.instrument = instrument
    }

    play(action:string){
        return `${this.name} ${action} the ${this.instrument}`
    }
}


const Page = new Guitarist('Jimmy', 'guitar')
console.log(Page.play('strums'))

//////////////////////

class Peeps {
    static count: number = 0

    static getCount(): number {
        return Peeps.count
    }
    public id: number

    constructor(public name: string){
        this.name = name
        this.id = ++Peeps.count
    
    }

}

const John = new Peeps('John')
const Steve = new Peeps('Steve')
const Amy = new Peeps('Amy')

console.log(Amy.id)
console.log(Steve.id)
console.log(Peeps.count)
///////////////////////////

// class Bands {
//     private dataState: string[]

//     constructor(){
//         this.dataState = []
//     }

//     public get Data(): string[] {
//         return this.dataState
//     }

//     public set data(value:string[]) {
//         if (Array.isArray(value) && value.every(el => typeof el === 'string')){
//             this.dataState = value
//             return
//         } else throw new Error('Param is not an array of strings')
//     }
// }

// const MyBands = new Bands()
// MyBands.data = ['Neil Young', 'Led Zep']
// console.log(MyBands.data)
// MyBands.data = [...MyBands.data, 'ZZ Top']
// console.log(MyBands.data)


