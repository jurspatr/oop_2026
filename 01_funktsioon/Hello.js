var message = "Hello world";
console.log(message);
// Create variables for name and age, then print them
var firstName = "Patrick";
var age = 21;
console.log("My name is " + firstName + " my age is " + age);
// Ticket logic based on age
if (age < 7) {
    console.log("Free");
}
else {
    console.log("Buy a ticket");
    if (age < 16) {
        console.log("Child ticket");
    }
    else {
        console.log("Full ticket");
    }
}
// Create an empty array
var symbols = [];
// Add one star for each year of age
for (var nr = 0; nr < age; nr++) {
    symbols.push("*");
}
// Print the array and then a single line of stars
console.log(symbols);
console.log(symbols.join(""));
