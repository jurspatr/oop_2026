// type IDFieldType = string | number;

// const printID = (id:IDFieldType) => {
//     console.log("ID: " + id);
// }

// printID(252563632)


interface BusinessPartner {
    name: string;
    creditScore: number;
}

interface UserIdentity {
    id: number;
    email: string;
}

type Employees = BusinessPartner & UserIdentity

const signContract = (employee: Employees):void => {
    console.log("Contract signed by " + employee.name +" with email: " + employee.email)
}

signContract({
    name:"Pedro", 
    creditScore:800, 
    id:34, 
    email:"perdo@gmail.com"
});