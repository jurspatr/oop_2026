
//ticketType class
class ticketType {
    constructor(protected price: number) {}

    //calculating ticket prices on crazy tuesday
    crazyTuesday() {
        return this.price * 0.5;
    }
    
    //calculating ticket prices on days that arent tuesday
    normalTickets() {
        return this.price;
    }
}

//putting different prices on different tickets
let adultTicket = new ticketType(9.54);
let studentTicket = new ticketType(7.77);
let childTicket = new ticketType(5.99);
let pensionerTicket = new ticketType(7.15);

//array of tickets based on wether its crazy tuesday or any other day
let tickets = [
    {typeName: "Adult", normal: adultTicket.normalTickets(), crazy: adultTicket.crazyTuesday()},
    {typeName: "Student", normal: studentTicket.normalTickets(), crazy: studentTicket.crazyTuesday()},
    {typeName: "Child", normal: childTicket.normalTickets(), crazy: childTicket.crazyTuesday()},
    {typeName: "Pensioner", normal: pensionerTicket.normalTickets(), crazy: pensionerTicket.crazyTuesday()},     
];

//printing out the prices of normal tickets
console.log("Tickets everyday apart from Tuesday cost:");
for (let item of tickets) {
    console.log(`${item.typeName}: ${item.normal.toFixed(2)}`);
}

//printing out the prices of tickets on crazy tuesday
console.log("\nCrazy Tuesday prices:");
for (let item of tickets) {
    console.log(`${item.typeName}: ${item.crazy.toFixed(2)}`);
}

//purchase request
console.log(("\nI would like to buy 2 adult tickets, 2 pensioner tickets, 1 child ticket and 1 student ticket please!"))
//price of purchase also taking into consideration the day
console.log("\nOf course, the total price will be: ", (2 * tickets[0].crazy + 2 * tickets[3].crazy + 1 * tickets[2].crazy + 1 * tickets[1].crazy).toFixed(2), ",since it is tuesday!")
