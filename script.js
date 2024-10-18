'use strict';
let score0 = document.querySelector('#score--0');
let score1 = document.getElementById('score--1');
let diceElement = document.querySelector('.dice');
let currentScore0 = document.getElementById('current--0');
let currentScore1 = document.getElementById('current--1');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
const restart = function () {
  playing = true;
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceElement.classList.add('hidden');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.getElementById(`name--0`).textContent = `Player 1`;
  document.getElementById(`name--1`).textContent = `Player 2`;
};
let playing, score, activePlayer, currentScore;
restart();
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1 Generating a random dice roll
    let diceValue = Math.trunc(Math.random() * 6) + 1;
    // Displaying the rolled dice
    diceElement.classList.remove('hidden');
    //changing the image using javascript, the src attribute is used
    diceElement.src = `dice-${diceValue}.png`;
    if (diceValue !== 1) {
      // adding the dice to the current score
      currentScore += diceValue;
      // here, the updating of the score was made to happen dynamically.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // based in the active player, the score gets updated into the socre array
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 10) {
      playing = false;
      if (!playing) {
        document.getElementById(`name--${activePlayer}`).textContent =
          '🥇 Winner';
        diceElement.classList.add('hidden');
        document.getElementById(`score--${activePlayer}`).textContent =
          score[activePlayer];
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      }
    } else {
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  restart();
});
