interface UserInterface{
    id: number;
    name: string;
    age?: number; //? makes it optional
    greet(message:string): void;
}


const User: UserInterface = {
    id:2,
    name:"Peter",
    greet(message) {
        console.log(message)
    }
}

User.greet("Hello!");

// if (!User.age) {
//     console.log("No age of the user")
// } else {
//     console.log(User.age);
// }

