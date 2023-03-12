const words = [
    "argue",
    "basic",
    "claim",
    "globe",
    "index",
    "often",
    "power",
    "reach",
    "style"
  ];
  
  const maxAttempts = 5;
  let currentAttempts = 0;
  let currentWord = getRandomWord();
  
  const wordContainer = document.getElementById("word-container");
  const input = document.getElementById("guess-input");
  const submitButton = document.getElementById("submit-button");
  const message = document.getElementById("message");
  
  wordContainer.innerHTML = currentWord
    .split("")
    .map(() => "_")
    .join(" ");
  
  submitButton.addEventListener("click", () => {
    const guess = input.value.toLowerCase();
    if (!guess || guess.length !== 5) {
      message.textContent = "Please enter a 5-letter word.";
      return;
    }
    if (guess === currentWord) {
      message.textContent = "You win!";
      submitButton.disabled = true;
      return;
    }
    currentAttempts++;
    if (currentAttempts >= maxAttempts) {
      message.textContent = `You lose! The word was "${currentWord}".`;
      submitButton.disabled = true;
      return;
    }
    const matchingLetters = getMatchingLetters(currentWord, guess);
    wordContainer.innerHTML = currentWord
      .split("")
      .map((letter, i) => {
        return matchingLetters.includes(i) ? letter : "_";
      })
      .join(" ");
    message.textContent = `You have ${
      maxAttempts - currentAttempts
    } attempts remaining.`;
  });
  
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  
  function getMatchingLetters(word, guess) {
    const matchingLetters = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess[i]) {
        matchingLetters.push(i);
      }
    }
    return matchingLetters;
  }
  