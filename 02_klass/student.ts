class Student{
    constructor(protected mathGrade:number, protected englishGrade:number){}

    //This method is to show the grades of the student
    show(): void{
        console.log(this.mathGrade, this.englishGrade)
    }
    //Write a method to calculate the average grade of the student
    averageGrade(): number{
        return (this.mathGrade + this.englishGrade) / 2;
    }
    //for calculating the average grade of two students
    /*averageMath(): number{
        return (s1.mathGrade + s2.mathGrade) / 2;
    }*/

    
    averageMath(count:number): number{
        return (this.mathGrade + count) / 2;
    }

    /*averageCoEnglish(): number{
        return (s1.englishGrade + s2.englishGrade) / 2;
    } */
   averageEnglish(count:number): number{
        return (this.englishGrade + count) / 2;
    }   
    //Write a method to add the grades of same subject
    add(other:Student):Student{
        return new Student(this.mathGrade + other.mathGrade, 
            this.englishGrade + other.englishGrade);
    }

    improveMath():void{
        this.mathGrade += 5;
        //this.mathGrade = this.mathGrade+5;
    }
}

let s1: Student=new Student(85, 92);
let s2: Student=new Student(70, 95)

//Array of students
let Students: Student[] = [
    new Student(80,97),
    new Student(75,90),
]

//Combine all students' grades
let ClassTotal = Students[0];

for(let i = 1; i < Students.length; i++){
    ClassTotal = ClassTotal.add(Students[i])
}

//NUMBER OF STUDENTS IN THE CLASS
const n=Students.length;
console.log("Class average of maths", ClassTotal.averageMath(n));
//let s3: Student=new Student(90, 88);
/* console.log(s1.mathGrade); */
s1.show();
console.log("Student1's average grade: " + s1.averageGrade());

//Test adding other student grades
let combined=s1.add(s2)
combined.show();
console.log("S1 and S2 combined average english grade: " + combined.averageEnglish(n));
console.log("S1 and S2 combined average math grade: " + combined.averageMath(n));

s1.improveMath();
s1.show();