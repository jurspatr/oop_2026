// type IDFieldType = string | number;
var signContract = function (employee) {
    console.log("Contract signed by " + employee.name + " with email: " + employee.email);
};
signContract({
    name: "Pedro",
    creditScore: 800,
    id: 34,
    email: "perdo@gmail.com"
});
