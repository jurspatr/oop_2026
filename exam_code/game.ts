abstract class Item {
  abstract use(game: VikingQuizGame, index?: number): string;
}

class Shield extends Item {
  use(game: VikingQuizGame): string {
    game.shieldOn = true;
    return "Shield is active.";
  }
}

class Sword extends Item {
  use(game: VikingQuizGame): string {
    return game.removeWrongAnswers(2);
  }
}

class Spear extends Item {
  use(game: VikingQuizGame): string {
    return game.removeWrongAnswers(1);
  }
}

class Gold extends Item {
  use(game: VikingQuizGame): string {
    return "Correct answer: " + game.answers[game.correct];
  }
}

class Knife extends Item {
  use(game: VikingQuizGame, index?: number): string {
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
  }
}

class VikingQuizGame {
  question = "Which alphabet did the Vikings use?";
  answers = [
    "Latin alphabet",
    "Greek alphabet",
    "Runes / Younger Futhark",
    "Cyrillic alphabet"
  ];
  correct = 2;

  removed = new Set<number>();
  shieldOn = false;
  knifeMode = false;
  shieldUsedWrong = false;

  shield = new Shield();
  sword = new Sword();
  knife = new Knife();
  spear = new Spear();
  gold = new Gold();

  answer(index: number): string {
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
  }

  removeWrongAnswers(amount: number): string {
    let wrong: number[] = [];

    for (let i = 0; i < this.answers.length; i++) {
      if (i !== this.correct && !this.removed.has(i)) {
        wrong.push(i);
      }
    }

    wrong = wrong.sort(() => Math.random() - 0.5);

    for (let i = 0; i < amount && i < wrong.length; i++) {
      this.removed.add(wrong[i]);
    }

    return "Removed wrong answer(s).";
  }
}

const game = new VikingQuizGame();

const answersDiv = document.getElementById("answers") as HTMLDivElement;
const message = document.getElementById("message") as HTMLParagraphElement;
const question = document.getElementById("question") as HTMLParagraphElement;

question.textContent = game.question;

function showAnswers(): void {
  answersDiv.innerHTML = "";

  for (let i = 0; i < game.answers.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = game.answers[i];

    if (game.removed.has(i)) {
      btn.disabled = true;
      btn.classList.add("removed");
    }

    btn.addEventListener("click", () => {
      if (game.knifeMode) {
        message.textContent = game.knife.use(game, i);
      } else {
        message.textContent = game.answer(i);
      }
      showAnswers();
    });

    answersDiv.appendChild(btn);
  }
}

document.getElementById("shieldBtn")!.addEventListener("click", () => {
  message.textContent = game.shield.use(game);
});

document.getElementById("swordBtn")!.addEventListener("click", () => {
  message.textContent = game.sword.use(game);
  showAnswers();
});

document.getElementById("knifeBtn")!.addEventListener("click", () => {
  message.textContent = game.knife.use(game);
});

document.getElementById("spearBtn")!.addEventListener("click", () => {
  message.textContent = game.spear.use(game);
  showAnswers();
});

document.getElementById("goldBtn")!.addEventListener("click", () => {
  message.textContent = game.gold.use(game);
});

showAnswers();