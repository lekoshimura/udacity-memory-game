/*global performance*/
/*global Cards*/
/*global soundEvents*/
/*global animationEvents*/
/*global events*/

/*  General Selectors */

let container = document.querySelector('.deck');
let movesField = document.querySelector('.moves');
let starRatingField = document.querySelector('.score-panel .stars');
let resetBtn = document.querySelector('.restart');

/* Congratulation Modal Popup Selectors*/

let congratsModal = document.querySelector('.congrats-modal');
let congratsTitleBarMsg = document.querySelector('.congrats-title-bar-msg');
let congratsCloseBtn = document.querySelector('.congrats-close-btn');
let congratsStarRatingField = document.querySelector('.congrats-box .stars');
let congratsMsg = document.querySelector('.congrats-msg');
let congratsPlayAgain = document.querySelector('.congrats-play-again');

/* Sounds and Special Effects Selectors */

let soundCardClick = document.querySelector('.sound-card-click');
let soundCardMatch = document.querySelector('.sound-cards-match');
let soundEndingGame = document.querySelector('.sound-ending-game');

/* Game global vars */

let globals = {
  timeStarted: null,
  timeEnded: null,
  moves: 0,
  openCards: [],
  waitForTimeout: false,
  matchingCards: 0,
  cards: null
};

/* App Behaviour */

let reset = function() {
  globals.timeStarted = performance.now();
  globals.timeEnded = null;
  globals.moves = 0;
  globals.openCards = [];
  globals.waitForTimeout = false;
  globals.matchingCards = 0;

  globals.cards = null;
  globals.cards = new Cards();
  globals.cards.build();
  globals.cards.flipAllCardsDown();
  globals.cards.shuffle();
  
  movesDisplay();
  clearCardsFromContainer();
  addCardsToContainer();
  displayStarRating(starRatingField);

  soundEvents.setSoundCardClick(soundCardClick);
  soundEvents.setSoundCardMatch(soundCardMatch);
  soundEvents.setSoundEndingGame(soundEndingGame);

  animationEvents.setCongratsModal(congratsModal);
};

// Game displays the current number of moves a user has made.
let movesDisplay = function(increment) {
  if (increment) {
    globals.moves++;
  }
  movesField.innerHTML = globals.moves;
};

let clearCardsFromContainer = function() {
  container.innerHTML = '';
};

let addCardsToContainer = function() {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < globals.cards.items.length; i++) {
    fragment.appendChild(globals.cards.items[i].getElement());
  }
  container.appendChild(fragment);
};

let lockMatchingCards = function() {
  globals.openCards[0].setAsMatch();
  globals.openCards[1].setAsMatch();
  globals.openCards = [];
  globals.matchingCards += 2;

  // matching event: useful to trigger sounds, animations, etc.
  events.matchingCards();
};

let hideNonMatchingCards = function() {
  this.waitForTimeout = true;
  window.setTimeout(function() {
    globals.openCards[0].hideSymbol();
    globals.openCards[1].hideSymbol();
    globals.openCards = [];
    globals.waitForTimeout = false;
  }, 1000);
};

let getRating = function() {
  if (globals.moves >= 35) {
    return 1;
  }
  else if (globals.moves >= 25 && globals.moves < 35) {
    return 2;
  }
  else if (globals.moves < 25) {
    return 3;
  }
};

// Star Rating | The game displays a star rating (from 1 to at least 3) 
// that reflects the player's performance. At the beginning of a game, 
// it should display at least 3 stars. After some number of moves, it should 
// change to a lower star rating. After a few more moves, it should change to
// a even lower star rating (down to 1). The number of moves needed to change
// the rating is up to you, but it should happen at some point.
let displayStarRating = function(starContainer) {
  // debugger;
  let rating = getRating();
  let stars = starContainer.querySelectorAll('i');
  for (let c = 0; c < stars.length; c++) {
    stars[c].classList = '';
    stars[c].classList.add('fa');
    c < rating ? stars[c].classList.add('fa-star') : stars[c].classList.add('fa-star-o');
  }
};

// When a user wins the game, a modal appears to congratulate the player and 
// ask if they want to play again. It should also tell the user how much time
// it took to win the game, and what the star rating was.
let displayFinalScore = function() {
  // When a user wins the game, a modal appears to congratulate the player 
  // and ask if they want to play again. It should also tell the user how much
  // time it took to win the game, and what the star rating was.
  globals.timeEnded = performance.now();
  let elapasedTimeInSeconds = (globals.timeEnded - globals.timeStarted) / 1000;
  let msg = `<p>You took ${elapasedTimeInSeconds.toFixed(1)} seconds to solve this and won ${getRating()} stars!`;
  if (getRating() === 3) {
    congratsTitleBarMsg.innerHTML = '&#128514; FANTASTIC!';
  }
  else if (getRating() === 2) {
    congratsTitleBarMsg.innerHTML = '&#128516; Great!';
  }
  else if (getRating() === 1) {
    congratsTitleBarMsg.innerHTML = '&#9785; Well, well, well...';
  }
  congratsMsg.innerHTML = msg;
  displayStarRating(congratsStarRatingField);

  // trigger event: useful for animations, sound effects, etc.
  events.congratsModalOpening(getRating());
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.addEventListener('DOMContentLoaded', function(event) {
  soundEvents.setSoundCardClick(soundCardClick);
  soundEvents.setSoundCardMatch(soundCardMatch);
  soundEvents.setSoundEndingGame(soundEndingGame);
  animationEvents.setCongratsModal(congratsModal);
  reset();

  // A restart button allows the player to reset the game board, the timer, and the star rating.
  resetBtn.addEventListener('click', function() {
    reset();
  });

  // When a user wins the game, a modal appears to congratulate the player and 
  // ask if they want to play again. It should also tell the user how much time
  // it took to win the game, and what the star rating was.
  congratsPlayAgain.addEventListener('click', function() {
    reset();
    events.congratsModalClosing();
  });

  congratsCloseBtn.addEventListener('click', function() {
    events.congratsModalClosing();
  });

});
