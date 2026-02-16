// ------------------------------------------------------
// Student class
class Student {
  constructor(
    protected mathGrade: number,
    protected englishGrade: number
  ) {}

  // Show the grades
  show(): void {
    console.log("Math:", this.mathGrade, "English:", this.englishGrade);
  }

  // Calculate and return the average grade
  average(): number {
    return (this.mathGrade + this.englishGrade) / 2;
  }

  // Add grades of the same subjects from another student
  // Returns a NEW Student object (does not modify originals)
  add(other: Student): Student {
    return new Student(
      this.mathGrade + other.mathGrade,
      this.englishGrade + other.englishGrade
    );
  }

  // Calculate average math grade after combining students
  averageMath(count: number): number {
    return this.mathGrade / count;
  }

  // Increase math grade by 5 points (mutates this object)
  improveMath(): void {
    this.mathGrade += 5;
    // this.mathGrade = this.mathGrade + 5;
  }
}

// ------------------------------------------------------
// Create two students
let s1: Student = new Student(85, 92);
let s2: Student = new Student(70, 90);

// ------------------------------------------------------
// Array of students (a class group)
let students: Student[] = [
  new Student(80, 85),
  new Student(90, 88),
  new Student(97, 80),
  new Student(75, 88)
];

// ------------------------------------------------------
// Combine all students into one total student
let classTotal = students[0];

for (let i = 1; i < students.length; i++) {
  classTotal = classTotal.add(students[i]);
}

// Number of students in the class
const n = students.length;

// Calculate and print class average for math
console.log("Class average (math):", classTotal.averageMath(n));

// ------------------------------------------------------
// Test individual student methods

s1.show();
console.log("Average of S1:", s1.average());

// Test adding two students
let combined = s1.add(s2);
combined.show();
console.log("Average of both students (math):", combined.averageMath(2));

// Improve math grade of student 1
s1.improveMath();
s1.show();