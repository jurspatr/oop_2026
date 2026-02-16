//ticketType class
var ticketType = /** @class */ (function () {
    function ticketType(price) {
        this.price = price;
    }
    //calculating ticket prices on crazy tuesday
    ticketType.prototype.crazyTuesday = function () {
        return this.price * 0.5;
    };
    //calculating ticket prices on days that arent tuesday
    ticketType.prototype.normalTickets = function () {
        return this.price;
    };
    return ticketType;
}());
//putting different prices on different tickets
var adultTicket = new ticketType(9.54);
var studentTicket = new ticketType(7.77);
var childTicket = new ticketType(5.99);
var pensionerTicket = new ticketType(7.15);
//array of tickets based on wether its crazy tuesday or any other day
var tickets = [
    { typeName: "Adult", normal: adultTicket.normalTickets(), crazy: adultTicket.crazyTuesday() },
    { typeName: "Student", normal: studentTicket.normalTickets(), crazy: studentTicket.crazyTuesday() },
    { typeName: "Child", normal: childTicket.normalTickets(), crazy: childTicket.crazyTuesday() },
    { typeName: "Pensioner", normal: pensionerTicket.normalTickets(), crazy: pensionerTicket.crazyTuesday() },
];
//printing out the prices of normal tickets
console.log("Tickets everyday apart from Tuesday cost:");
for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
    var item = tickets_1[_i];
    console.log("".concat(item.typeName, ": ").concat(item.normal.toFixed(2)));
}
//printing out the prices of tickets on crazy tuesday
console.log("\nCrazy Tuesday prices:");
for (var _a = 0, tickets_2 = tickets; _a < tickets_2.length; _a++) {
    var item = tickets_2[_a];
    console.log("".concat(item.typeName, ": ").concat(item.crazy.toFixed(2)));
}
//purchase request
console.log(("\nI would like to buy 2 adult tickets, 2 pensioner tickets, 1 child ticket and 1 student ticket please!"));
//price of purchase also taking into consideration the day
console.log("\nOf course, the total price will be: ", (2 * tickets[0].crazy + 2 * tickets[3].crazy + 1 * tickets[2].crazy + 1 * tickets[1].crazy).toFixed(2), ",since it is tuesday!");
