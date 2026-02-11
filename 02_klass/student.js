var Student = /** @class */ (function () {
    function Student(mathGrade, englishGrade) {
        this.mathGrade = mathGrade;
        this.englishGrade = englishGrade;
    }
    //This method is to show the grades of the student
    Student.prototype.show = function () {
        console.log(this.mathGrade, this.englishGrade);
    };
    //Write a method to calculate the average grade of the student
    Student.prototype.averageGrade = function () {
        return (this.mathGrade + this.englishGrade) / 2;
    };
    //for calculating the average grade of two students
    /*averageMath(): number{
        return (s1.mathGrade + s2.mathGrade) / 2;
    }*/
    Student.prototype.averageMath = function (count) {
        return (this.mathGrade + count) / 2;
    };
    /*averageCoEnglish(): number{
        return (s1.englishGrade + s2.englishGrade) / 2;
    } */
    Student.prototype.averageEnglish = function (count) {
        return (this.englishGrade + count) / 2;
    };
    //Write a method to add the grades of same subject
    Student.prototype.add = function (other) {
        return new Student(this.mathGrade + other.mathGrade, this.englishGrade + other.englishGrade);
    };
    Student.prototype.improveMath = function () {
        this.mathGrade += 5;
        //this.mathGrade = this.mathGrade+5;
    };
    return Student;
}());
var s1 = new Student(85, 92);
var s2 = new Student(70, 95);
//Array of students
var Students = [
    new Student(80, 97),
    new Student(75, 90),
    new Student(90, 85)
];
//Combine all students' grades
var ClassTotal = Students[0];
for (var i = 1; i < Students.length; i++) {
    ClassTotal = ClassTotal.add(Students[i]);
}
//NUMBER OF STUDENTS IN THE CLASS
var n = Students.length;
console.log("Class average of maths", ClassTotal.averageMath(n));
//let s3: Student=new Student(90, 88);
/* console.log(s1.mathGrade); */
s1.show();
console.log("Student1's average grade: " + s1.averageGrade());
//Test adding other student grades
var combined = s1.add(s2);
combined.show();
console.log("S1 and S2 combined average english grade: " + combined.averageEnglish(n));
console.log("S1 and S2 combined average math grade: " + combined.averageMath(n));
s1.improveMath();
s1.show();
