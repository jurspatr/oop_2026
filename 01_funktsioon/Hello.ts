let message: string = "Hello world";
console.log(message);

// Create variables for name and age, then print them
let firstName: string = "Patrick";
let age: number = 21;

console.log("My name is " + firstName + " my age is " + age);

// Ticket logic based on age
if (age < 7) {
    console.log("Free");
} else {
    console.log("Buy a ticket");

    if (age < 16) {
        console.log("Child ticket");
    } else {
        console.log("Full ticket");
    }
}

// Create an empty array
let symbols: string[] = [];

// Add one star for each year of age
for (let nr = 0; nr < age; nr++) {
    symbols.push("*");
}

// Print the array and then a single line of stars
console.log(symbols);
console.log(symbols.join(""));