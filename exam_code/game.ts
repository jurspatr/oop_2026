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

    game.removed.add(index); // Lisab valitud vale vastuse eemaldatud vastuste hulka.
    game.knifeMode = false; 
    return "Removed answer."; 
  }
}

class VikingQuizGame { 
  question = "Which alphabet did the Vikings use?";
  answers = [ // Vastuste massiiv.
    "Latin alphabet", // Esimene vastusevariant.
    "Greek alphabet", // Teine vastusevariant.
    "Runes / Younger Futhark", // Kolmas vastusevariant, mis on õige.
    "Cyrillic alphabet" // Neljas vastusevariant.
  ];
  correct = 2; 

  removed = new Set<number>(); // Set hoiab alles eemaldatud vastuste indeksid.
  shieldOn = false; 
  knifeMode = false; 
  shieldUsedWrong = false;

  shield = new Shield(); // Loob Shield objekti
  sword = new Sword(); // Loob Sword objekti.
  knife = new Knife(); // Loob Knife objekti.
  spear = new Spear(); // Loob Spear objekti.
  gold = new Gold(); // Loob Gold objekti.

  answer(index: number): string { // kontrollin kasutaja valitud vastust.
    if (this.removed.has(index)) { // Kontrollin, kas see vastus on juba eemaldatud.
      return "That answer is removed.";
    }

    if (index === this.correct) { 
      return "Correct! Vikings used runes."; 
    }

    if (this.shieldOn && !this.shieldUsedWrong) { // Kontrollin, kas kilp on peal ja lisakatset pole veel kasutatud.
      this.shieldUsedWrong = true; 
      this.shieldOn = false; 
      return "Wrong, but shield gives you one extra try."; 
    }

    return "Wrong answer."; 
  }

  removeWrongAnswers(amount: number): string { // Meetod, mis eemaldab etteantud arvu valesid vastuseid.
    let wrong: number[] = []; // Loon tühja massiivi valede vastuste indeksite hoidmiseks.

    for (let i = 0; i < this.answers.length; i++) {
      if (i !== this.correct && !this.removed.has(i)) { // Kontrollin, et vastus poleks õige ega juba eemaldatud.
        wrong.push(i); // Meetod lisab selle vale vastuse indeksi wrong massiivi.
      }
    }

    wrong = wrong.sort(() => Math.random() - 0.5); // Segan valede vastuste järjekorra juhuslikuks.

    for (let i = 0; i < amount && i < wrong.length; i++) { // Käib läbi nii palju valesid vastuseid, kui vaja eemaldada või kui saadaval on.
      this.removed.add(wrong[i]); // Lisab iga valitud vale vastuse eemaldatud vastuste hulka.
    }

    return "Removed wrong answer(s)."; 
  }
}

const game = new VikingQuizGame(); // Loon mängu objekti.

const answersDiv = document.getElementById("answers") as HTMLDivElement; // Otsin HTML-ist elementi id-ga "answers" 
const message = document.getElementById("message") as HTMLParagraphElement; // Otsin HTML-ist elementi id-ga "message" 
const question = document.getElementById("question") as HTMLParagraphElement; // Otsin HTML-ist küsimuse elementi.

question.textContent = game.question; // Paneb küsimuse teksti HTML elementi nähtavale.

function showAnswers(): void { 
  answersDiv.innerHTML = ""; 

  for (let i = 0; i < game.answers.length; i++) { 
    const btn = document.createElement("button");
    btn.textContent = game.answers[i]; // Panen nupu tekstiks vastuse sisu.

    if (game.removed.has(i)) { // Kontrollin, kas  vastus on eemaldatud
      btn.disabled = true; 
      btn.classList.add("removed");
    }

    btn.addEventListener("click", () => { // Lisan nupule kliki ja kontrollin noa režiimi
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
  showAnswers(); // uuendan vastuste kuvamist sest mõned vastused kadudsid
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