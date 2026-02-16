// ------------------------------------------------------
// Student class
var Student = /** @class */ (function () {
    function Student(mathGrade, englishGrade) {
        this.mathGrade = mathGrade;
        this.englishGrade = englishGrade;
    }
    // Show the grades
    Student.prototype.show = function () {
        console.log("Math:", this.mathGrade, "English:", this.englishGrade);
    };
    // Calculate and return the average grade
    Student.prototype.average = function () {
        return (this.mathGrade + this.englishGrade) / 2;
    };
    // Add grades of the same subjects from another student
    // Returns a NEW Student object (does not modify originals)
    Student.prototype.add = function (other) {
        return new Student(this.mathGrade + other.mathGrade, this.englishGrade + other.englishGrade);
    };
    // Calculate average math grade after combining students
    Student.prototype.averageMath = function (count) {
        return this.mathGrade / count;
    };
    // Increase math grade by 5 points (mutates this object)
    Student.prototype.improveMath = function () {
        this.mathGrade += 5;
        // this.mathGrade = this.mathGrade + 5;
    };
    return Student;
}());
// ------------------------------------------------------
// Create two students
var s1 = new Student(85, 92);
var s2 = new Student(70, 90);
// ------------------------------------------------------
// Array of students (a class group)
var students = [
    new Student(80, 85),
    new Student(90, 88),
    new Student(97, 80),
    new Student(75, 88)
];
// ------------------------------------------------------
// Combine all students into one total student
var classTotal = students[0];
for (var i = 1; i < students.length; i++) {
    classTotal = classTotal.add(students[i]);
}
// Number of students in the class
var n = students.length;
// Calculate and print class average for math
console.log("Class average (math):", classTotal.averageMath(n));
// ------------------------------------------------------
// Test individual student methods
s1.show();
console.log("Average of S1:", s1.average());
// Test adding two students
var combined = s1.add(s2);
combined.show();
console.log("Average of both students (math):", combined.averageMath(2));
// Improve math grade of student 1
s1.improveMath();
s1.show();
