var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Item = /** @class */ (function () {
    function Item() {
        this.used = false;
    }
    return Item;
}());
var Shield = /** @class */ (function (_super) {
    __extends(Shield, _super);
    function Shield() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "shield";
        return _this;
    }
    Shield.prototype.use = function (game) {
        if (this.used)
            return "Shield has already been used.";
        this.used = true;
        game.shieldOn = true;
        return "Shield is active. You get one extra try!";
    };
    return Shield;
}(Item));
var Sword = /** @class */ (function (_super) {
    __extends(Sword, _super);
    function Sword() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "sword";
        return _this;
    }
    Sword.prototype.use = function (game) {
        if (this.used)
            return "Sword has already been used.";
        this.used = true;
        return game.removeWrongAnswers(2);
    };
    return Sword;
}(Item));
var Spear = /** @class */ (function (_super) {
    __extends(Spear, _super);
    function Spear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "spear";
        return _this;
    }
    Spear.prototype.use = function (game) {
        if (this.used)
            return "Spear has already been used.";
        this.used = true;
        return game.removeWrongAnswers(1);
    };
    return Spear;
}(Item));
var Gold = /** @class */ (function (_super) {
    __extends(Gold, _super);
    function Gold() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "gold";
        return _this;
    }
    Gold.prototype.use = function (game) {
        if (this.used)
            return "Gold has already been used.";
        this.used = true;
        return "Correct answer: " + game.currentQuestion.answers[game.currentQuestion.correct];
    };
    return Gold;
}(Item));
var Knife = /** @class */ (function (_super) {
    __extends(Knife, _super);
    function Knife() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "knife";
        return _this;
    }
    Knife.prototype.use = function (game, index) {
        if (this.used && index === undefined) {
            return "Knife has already been used.";
        }
        if (index === undefined) {
            game.knifeMode = true;
            return "Click an answer to remove it.";
        }
        if (index === game.currentQuestion.correct) {
            game.knifeMode = false;
            return "That answer is correct, so you cannot remove it.";
        }
        game.removed.add(index);
        game.knifeMode = false;
        this.used = true;
        return "Removed answer.";
    };
    return Knife;
}(Item));
var VikingQuizGame = /** @class */ (function () {
    function VikingQuizGame(questions) {
        this.currentQuestionIndex = 0;
        this.removed = new Set();
        this.shieldOn = false;
        this.knifeMode = false;
        this.shieldUsedWrong = false;
        this.answeredCorrectly = false;
        this.shield = new Shield();
        this.sword = new Sword();
        this.knife = new Knife();
        this.spear = new Spear();
        this.gold = new Gold();
        this.questions = questions;
    }
    Object.defineProperty(VikingQuizGame.prototype, "currentQuestion", {
        get: function () {
            return this.questions[this.currentQuestionIndex];
        },
        enumerable: false,
        configurable: true
    });
    VikingQuizGame.prototype.answer = function (index) {
        if (this.removed.has(index)) {
            return "That answer is removed.";
        }
        if (index === this.currentQuestion.correct) {
            this.answeredCorrectly = true;
            return "Correct!";
        }
        if (this.shieldOn && !this.shieldUsedWrong) {
            this.shieldUsedWrong = true;
            this.shieldOn = false;
            return "Wrong, but shield gives you one extra try!";
        }
        return "Wrong answer.";
    };
    VikingQuizGame.prototype.removeWrongAnswers = function (amount) {
        var wrong = [];
        for (var i = 0; i < this.currentQuestion.answers.length; i++) {
            if (i !== this.currentQuestion.correct && !this.removed.has(i)) {
                wrong.push(i);
            }
        }
        wrong = wrong.sort(function () { return Math.random() - 0.5; });
        for (var i = 0; i < amount && i < wrong.length; i++) {
            this.removed.add(wrong[i]);
        }
        return "Removed wrong answer(s).";
    };
    VikingQuizGame.prototype.nextQuestion = function () {
        if (!this.answeredCorrectly) {
            return false;
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.removed.clear();
            this.shieldOn = false;
            this.knifeMode = false;
            this.shieldUsedWrong = false;
            this.answeredCorrectly = false;
            return true;
        }
        return false;
    };
    return VikingQuizGame;
}());
var questions = [
    {
        question: "Which alphabet did the Vikings use?",
        answers: [
            "Latin alphabet",
            "Greek alphabet",
            "Runes / Younger Futhark",
            "Cyrillic alphabet"
        ],
        correct: 2
    },
    {
        question: "What was the name of Thor's hammer?",
        answers: [
            "Gungnir",
            "Mjolnir",
            "Excalibur",
            "Draupnir"
        ],
        correct: 1
    }
];
var game = new VikingQuizGame(questions);
var questionEl = document.getElementById("question");
var answersDiv = document.getElementById("answers");
var messageEl = document.getElementById("message");
var inventoryEl = document.getElementById("inventory");
var shieldBtn = document.getElementById("shieldBtn");
var swordBtn = document.getElementById("swordBtn");
var knifeBtn = document.getElementById("knifeBtn");
var spearBtn = document.getElementById("spearBtn");
var goldBtn = document.getElementById("goldBtn");
var nextBtn = document.getElementById("nextBtn");
function updateQuestion() {
    questionEl.textContent = game.currentQuestion.question;
}
function updateInventory() {
    var available = [];
    if (!game.shield.used)
        available.push("Shield");
    if (!game.sword.used)
        available.push("Sword");
    if (!game.knife.used)
        available.push("Knife");
    if (!game.spear.used)
        available.push("Spear");
    if (!game.gold.used)
        available.push("Gold");
}
function updateItemButtons() {
    shieldBtn.disabled = game.shield.used;
    swordBtn.disabled = game.sword.used;
    knifeBtn.disabled = game.knife.used;
    spearBtn.disabled = game.spear.used;
    goldBtn.disabled = game.gold.used;
}
function showAnswers() {
    answersDiv.innerHTML = "";
    var _loop_1 = function (i) {
        var btn = document.createElement("button");
        btn.textContent = game.currentQuestion.answers[i];
        if (game.removed.has(i)) {
            btn.disabled = true;
            btn.classList.add("removed");
        }
        if (game.answeredCorrectly) {
            btn.disabled = true;
        }
        btn.addEventListener("click", function () {
            if (game.knifeMode) {
                messageEl.textContent = game.knife.use(game, i);
            }
            else {
                var result = game.answer(i);
                if (result === "Correct!") {
                    if (game.currentQuestionIndex === 0) {
                        messageEl.textContent = "Correct! Vikings used runes.";
                    }
                    else if (game.currentQuestionIndex === 1) {
                        messageEl.textContent = "Correct! Thor's hammer was Mjolnir.";
                    }
                    else {
                        messageEl.textContent = "Correct!";
                    }
                    nextBtn.style.display = "inline-block";
                }
                else {
                    messageEl.textContent = result;
                }
            }
            updateItemButtons();
            updateInventory();
            showAnswers();
        });
        answersDiv.appendChild(btn);
    };
    for (var i = 0; i < game.currentQuestion.answers.length; i++) {
        _loop_1(i);
    }
}
function goToNextQuestion() {
    if (!game.answeredCorrectly) {
        messageEl.textContent = "You can move on only after choosing the correct answer.";
        return;
    }
    var hasNext = game.nextQuestion();
    if (hasNext) {
        updateQuestion();
        showAnswers();
        updateItemButtons();
        updateInventory();
        messageEl.textContent = "Next question!";
        nextBtn.style.display = "none";
    }
    else {
        questionEl.textContent = "You finished the quiz!";
        answersDiv.innerHTML = "";
        messageEl.textContent = "Well done, brave Viking!";
        nextBtn.style.display = "none";
    }
}
shieldBtn.addEventListener("click", function () {
    if (game.answeredCorrectly)
        return;
    messageEl.textContent = game.shield.use(game);
    updateItemButtons();
    updateInventory();
});
swordBtn.addEventListener("click", function () {
    if (game.answeredCorrectly)
        return;
    messageEl.textContent = game.sword.use(game);
    updateItemButtons();
    updateInventory();
    showAnswers();
});
knifeBtn.addEventListener("click", function () {
    if (game.answeredCorrectly)
        return;
    messageEl.textContent = game.knife.use(game);
    updateItemButtons();
    updateInventory();
});
spearBtn.addEventListener("click", function () {
    if (game.answeredCorrectly)
        return;
    messageEl.textContent = game.spear.use(game);
    updateItemButtons();
    updateInventory();
    showAnswers();
});
goldBtn.addEventListener("click", function () {
    if (game.answeredCorrectly)
        return;
    messageEl.textContent = game.gold.use(game);
    updateItemButtons();
    updateInventory();
});
nextBtn.addEventListener("click", function () {
    goToNextQuestion();
});
updateQuestion();
showAnswers();
updateItemButtons();
updateInventory();
nextBtn.style.display = "none";
