'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// score0El.textContent = 0;
// score1El.textContent = 0;

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
let scores, currentScore, activePlayer;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  btnNew.classList.remove('new--game--win');
  //   diceEl.style.display = 'block';
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
};

const changeActivePlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  currentScore = 0;
};
init();

const playerWins = function (score, player) {
  if (score >= 20) {
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    btnNew.classList.add('new--game--win');
    diceEl.classList.add('hidden');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
  } else {
    changeActivePlayer();
  }
};

btnRoll.addEventListener('click', () => {
  // 1. Generating random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // 3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore; //change later
  } else {
    changeActivePlayer();
  }
});

btnHold.addEventListener('click', () => {
  //   if (activePlayer === 0) {
  //     scores[0] += currentScore;
  //     score0El.textContent = scores[0];
  //     playerWins(scores[0], 0);
  //   } else {
  //     scores[1] += currentScore;
  //     score1El.textContent = scores[1];
  //     playerWins(scores[1], 1);
  //   }
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  playerWins(scores[activePlayer], activePlayer);
});

btnNew.addEventListener('click', init);
