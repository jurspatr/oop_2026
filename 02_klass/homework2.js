var ticketType = /** @class */ (function () {
    function ticketType(price) {
        this.price = price;
    }
    ticketType.prototype.crazyTuesday = function () {
        return this.price * 0.5;
    };
    ticketType.prototype.cinemaBirthday = function () {
        return this.price * 0.75;
    };
    return ticketType;
}());
//defining ticket types and prices
var adultTicket = new ticketType(9.54);
var studentTicket = new ticketType(7.77);
var childTicket = new ticketType(5.99);
var pensionerTicket = new ticketType(7.15);
//calculate ticket prices on crazy tuesday
var ticketPrice = 0;
ticketPrice = adultTicket.crazyTuesday();
ticketPrice = studentTicket.crazyTuesday();
ticketPrice = childTicket.crazyTuesday();
ticketPrice = pensionerTicket.crazyTuesday();
//calculate the price of each ticket type on crazy Tuesday
var tickets = [
    { typeName: "Adult", price: adultTicket.crazyTuesday() },
    { typeName: "Student", price: studentTicket.crazyTuesday() },
    { typeName: "Child", price: childTicket.crazyTuesday() },
    { typeName: "Pensioner", price: pensionerTicket.crazyTuesday() },
];
for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
    var item = tickets_1[_i];
    var priceCrazyTuesday = ticketPrice;
    console.log(item.typeName, "price on crazy tuesday is: ", item.price.toFixed(2));
}
