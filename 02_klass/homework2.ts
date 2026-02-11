class ticketType{
    constructor(protected price:number){}

    crazyTuesday(){
        return this.price*0.5;
    }
    
    cinemaBirthday(){
        return this.price*0.75
    }

}

//defining ticket types and prices
let adultTicket = new ticketType(9.54)
let studentTicket = new ticketType(7.77)
let childTicket = new ticketType(5.99)
let pensionerTicket = new ticketType(7.15)

//calculate ticket prices on crazy tuesday
let ticketPrice = 0;
ticketPrice = adultTicket.crazyTuesday()
ticketPrice = studentTicket.crazyTuesday()
ticketPrice = childTicket.crazyTuesday()
ticketPrice = pensionerTicket.crazyTuesday()


//calculate the price of each ticket type on crazy Tuesday
let tickets = [
    {typeName: "Adult", price: adultTicket.crazyTuesday()},
    {typeName: "Student", price: studentTicket.crazyTuesday()},
    {typeName: "Child", price: childTicket.crazyTuesday()},
    {typeName: "Pensioner", price: pensionerTicket.crazyTuesday()},    
];

for (let item of tickets){
    let priceCrazyTuesday = ticketPrice
    console.log(item.typeName, "price on crazy tuesday is: ", item.price.toFixed(2));
}

