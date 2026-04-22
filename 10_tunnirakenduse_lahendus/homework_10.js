var GradeCalculator = /** @class */ (function () {
    function GradeCalculator(studentName, grade1, grade2, grade3) {
        this.studentName = studentName;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
    }
    GradeCalculator.prototype.getSum = function () {
        return this.grade1 + this.grade2 + this.grade3;
    };
    GradeCalculator.prototype.getAverage = function () {
        return this.getSum() / 3;
    };
    GradeCalculator.prototype.getResult = function () {
        var average = this.getAverage();
        if (average >= 4.5) {
            return "Very good result";
        }
        else if (average >= 3.5) {
            return "Good result";
        }
        else if (average >= 2.5) {
            return "Satisfactory result";
        }
        else if (average >= 1.5) {
            return "Bad result";
        }
        else {
            return "You're going to drop out";
        }
    };
    return GradeCalculator;
}());
function calculateGrades() {
    var nameInput = document.getElementById("studentName");
    var grade1Input = document.getElementById("grade1");
    var grade2Input = document.getElementById("grade2");
    var grade3Input = document.getElementById("grade3");
    var output = document.getElementById("output");
    var studentName = nameInput.value;
    var grade1 = grade1Input.valueAsNumber;
    var grade2 = grade2Input.valueAsNumber;
    var grade3 = grade3Input.valueAsNumber;
    if (studentName.trim() === "" || isNaN(grade1) || isNaN(grade2) || isNaN(grade3)) {
        output.innerText = "Please fill all the fields.";
        return;
    }
    var calculator = new GradeCalculator(studentName, grade1, grade2, grade3);
    output.innerText =
        "".concat(calculator.studentName, " your sum of the grades is ").concat(calculator.getSum(), ". ") +
            "Average grade is ".concat(calculator.getAverage().toFixed(2), ". ") +
            "".concat(calculator.getResult(), ".");
}
