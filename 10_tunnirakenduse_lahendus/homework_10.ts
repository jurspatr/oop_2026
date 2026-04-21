class GradeCalculator {
    studentName: string;
    grade1: number;
    grade2: number;
    grade3: number;

    constructor(studentName: string, grade1: number, grade2: number, grade3: number) {
        this.studentName = studentName;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
    }

    getSum(): number {
        return this.grade1 + this.grade2 + this.grade3;
    }

    getAverage(): number {
        return this.getSum() / 3;
    }

    getResult(): string {
        const average = this.getAverage();

        if (average >= 4.5) {
            return "Very good result";
        } else if (average >= 3.5) {
            return "Good result";
        } else if (average >= 2.5) {
            return "Satisfactory result";
        } else if (average >= 1.5){
            return "Bad result";
        } else {
            return "You're going to drop out"
        }
    }
}

function calculateGrades(): void {
    const nameInput = document.getElementById("studentName") as HTMLInputElement;
    const grade1Input = document.getElementById("grade1") as HTMLInputElement;
    const grade2Input = document.getElementById("grade2") as HTMLInputElement;
    const grade3Input = document.getElementById("grade3") as HTMLInputElement;
    const output = document.getElementById("output") as HTMLHeadingElement;

    const studentName: string = nameInput.value;
    const grade1: number = grade1Input.valueAsNumber;
    const grade2: number = grade2Input.valueAsNumber;
    const grade3: number = grade3Input.valueAsNumber;

    if (studentName.trim() === "" || isNaN(grade1) || isNaN(grade2) || isNaN(grade3)) {
        output.innerText = "Please fill all the fields.";
        return;
    }

    const calculator = new GradeCalculator(studentName, grade1, grade2, grade3);

    output.innerText =
        `${calculator.studentName} your sum of the grades is ${calculator.getSum()}. ` +
        `Average grade is ${calculator.getAverage().toFixed(2)}. ` +
        `${calculator.getResult()}.`;
}