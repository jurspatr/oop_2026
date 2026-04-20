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
    }
    return Item;
}());
var Shield = /** @class */ (function (_super) {
    __extends(Shield, _super);
    function Shield() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shield.prototype.use = function (game) {
        game.shieldOn = true;
        return "Shield is active.";
    };
    return Shield;
}(Item));
var Sword = /** @class */ (function (_super) {
    __extends(Sword, _super);
    function Sword() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sword.prototype.use = function (game) {
        return game.removeWrongAnswers(2);
    };
    return Sword;
}(Item));
var Spear = /** @class */ (function (_super) {
    __extends(Spear, _super);
    function Spear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spear.prototype.use = function (game) {
        return game.removeWrongAnswers(1);
    };
    return Spear;
}(Item));
var Gold = /** @class */ (function (_super) {
    __extends(Gold, _super);
    function Gold() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gold.prototype.use = function (game) {
        return "Correct answer: " + game.answers[game.correct];
    };
    return Gold;
}(Item));
var Knife = /** @class */ (function (_super) {
    __extends(Knife, _super);
    function Knife() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Knife.prototype.use = function (game, index) {
        if (index === undefined) {
            game.knifeMode = true;
            return "Click an answer to remove.";
        }
        if (index === game.correct) {
            game.knifeMode = false;
            return "That one is correct, so you cannot remove it.";
        }
        game.removed.add(index);
        game.knifeMode = false;
        return "Removed answer.";
    };
    return Knife;
}(Item));
var VikingQuizGame = /** @class */ (function () {
    function VikingQuizGame() {
        this.question = "Which alphabet did the Vikings use?";
        this.answers = [
            "Latin alphabet",
            "Greek alphabet",
            "Runes / Younger Futhark",
            "Cyrillic alphabet"
        ];
        this.correct = 2;
        this.removed = new Set();
        this.shieldOn = false;
        this.knifeMode = false;
        this.shieldUsedWrong = false;
        this.shield = new Shield();
        this.sword = new Sword();
        this.knife = new Knife();
        this.spear = new Spear();
        this.gold = new Gold();
    }
    VikingQuizGame.prototype.answer = function (index) {
        if (this.removed.has(index)) {
            return "That answer is removed.";
        }
        if (index === this.correct) {
            return "Correct! Vikings used runes.";
        }
        if (this.shieldOn && !this.shieldUsedWrong) {
            this.shieldUsedWrong = true;
            this.shieldOn = false;
            return "Wrong, but shield gives you one extra try.";
        }
        return "Wrong answer.";
    };
    VikingQuizGame.prototype.removeWrongAnswers = function (amount) {
        var wrong = [];
        for (var i = 0; i < this.answers.length; i++) {
            if (i !== this.correct && !this.removed.has(i)) {
                wrong.push(i);
            }
        }
        wrong = wrong.sort(function () { return Math.random() - 0.5; });
        for (var i = 0; i < amount && i < wrong.length; i++) {
            this.removed.add(wrong[i]);
        }
        return "Removed wrong answer(s).";
    };
    return VikingQuizGame;
}());
var game = new VikingQuizGame();
var answersDiv = document.getElementById("answers");
var message = document.getElementById("message");
var question = document.getElementById("question");
question.textContent = game.question;
function showAnswers() {
    answersDiv.innerHTML = "";
    var _loop_1 = function (i) {
        var btn = document.createElement("button");
        btn.textContent = game.answers[i];
        if (game.removed.has(i)) {
            btn.disabled = true;
            btn.classList.add("removed");
        }
        btn.addEventListener("click", function () {
            if (game.knifeMode) {
                message.textContent = game.knife.use(game, i);
            }
            else {
                message.textContent = game.answer(i);
            }
            showAnswers();
        });
        answersDiv.appendChild(btn);
    };
    for (var i = 0; i < game.answers.length; i++) {
        _loop_1(i);
    }
}
document.getElementById("shieldBtn").addEventListener("click", function () {
    message.textContent = game.shield.use(game);
});
document.getElementById("swordBtn").addEventListener("click", function () {
    message.textContent = game.sword.use(game);
    showAnswers();
});
document.getElementById("knifeBtn").addEventListener("click", function () {
    message.textContent = game.knife.use(game);
});
document.getElementById("spearBtn").addEventListener("click", function () {
    message.textContent = game.spear.use(game);
    showAnswers();
});
document.getElementById("goldBtn").addEventListener("click", function () {
    message.textContent = game.gold.use(game);
});
showAnswers();
