let randomNumber = Math.floor(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number!');
  } else if (guess < 1 || guess > 100) {
    alert('Number must be between 1 and 100.');
  } else {
    prevGuess.push(guess);
    if (numGuess === 10) {
      displayGuess(guess);
      displayMessage(`Game Over! The number was ${randomNumber}.`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage('🎉 Correct! You guessed it!');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('📉 Too low!');
  } else {
    displayMessage('📈 Too high!');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.textContent += `${guess}, `;
  numGuess++;
  remaining.textContent = `${10 - numGuess + 1}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  const p = document.createElement('p');
  p.classList.add('button');
  p.setAttribute('id', 'newGame');
  p.textContent = '🔁 Start New Game';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function () {
    randomNumber = Math.floor(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.textContent = '';
    remaining.textContent = '10';
    userInput.removeAttribute('disabled');
    startOver.removeChild(newGameButton);
    lowOrHi.innerHTML = '';
    playGame = true;
  });
}
