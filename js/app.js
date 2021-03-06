/*global performance*/
/*global Cards*/
/*global soundEvents*/
/*global animationEvents*/
/*global events*/

/*  General Selectors */

const container = document.querySelector('.deck');
const movesField = document.querySelector('.moves');
const starRatingField = document.querySelector('.score-panel .stars');
const resetBtn = document.querySelector('.restart');

/* Congratulation Modal Popup Selectors*/

const congratsModal = document.querySelector('.congrats-modal');
const congratsTitleBarMsg = document.querySelector('.congrats-title-bar-msg');
const congratsCloseBtn = document.querySelector('.congrats-close-btn');
const congratsStarRatingField = document.querySelector('.congrats-box .stars');
const congratsMsg = document.querySelector('.congrats-msg');
const congratsPlayAgain = document.querySelector('.congrats-play-again');

/* Sounds and Special Effects Selectors */

const soundCardClick = document.querySelector('.sound-card-click');
const soundCardMatch = document.querySelector('.sound-cards-match');
const soundEndingGame = document.querySelector('.sound-ending-game');

/* Game global vars */

let globals = {
  timeStarted: null,
  timeEnded: null,
  moves: 0,
  openCards: [],
  waitForTimeout: false,
  matchingCards: 0,
  status: null,
  cards: null
};

/* App Behaviour */

/**
 * reset()
 * - reset global variables
 * - create a new array of cards and shuffle them
 * - clear the current board and places the new arrys of cards
 * */
let reset = function() {
  globals.timeStarted = performance.now();
  globals.timeEnded = null;
  globals.moves = 0;
  globals.openCards = [];
  globals.waitForTimeout = false;
  globals.matchingCards = 0;
  globals.status = 'ready';

  globals.cards = null;
  globals.cards = new Cards();
  globals.cards.build();
  globals.cards.flipAllCardsDown();
  globals.cards.shuffle();

  displayMoves();
  clearCardsFromContainer();
  addCardsToContainer();
  displayStarRating(starRatingField);

  soundEvents.setSoundCardClick(soundCardClick);
  soundEvents.setSoundCardMatch(soundCardMatch);
  soundEvents.setSoundEndingGame(soundEndingGame);
  animationEvents.setCongratsModal(congratsModal);
};

/**
 * displayMoves()
 * - displays the current number of moves a user has made.
 * */
let displayMoves = function() {
  movesField.innerHTML = globals.moves;
};

let clearCardsFromContainer = function() {
  container.innerHTML = '';
};

/**
 * addCardsToContainer()
 * - displays the arrys of cards on the page
 * */
let addCardsToContainer = function() {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < globals.cards.items.length; i++) {
    fragment.appendChild(globals.cards.items[i].getElement());
  }
  container.appendChild(fragment);
};

/**
 * lockMatchingCards()
 * - increments the matching cards counter
 * - trigger matchingCards() event
 * */
let lockMatchingCards = function() {
  globals.openCards[0].setAsMatch();
  globals.openCards[1].setAsMatch();
  globals.openCards = [];
  globals.matchingCards += 2;

  events.matchingCards();
};

/**
 * hideNonMatchingCards()
 * - "turn down" non-matching cards
 * */
let hideNonMatchingCards = function() {
  globals.waitForTimeout = true;
  window.setTimeout(function() {
    globals.openCards[0].hideSymbol();
    globals.openCards[1].hideSymbol();
    globals.openCards = [];
    globals.waitForTimeout = false;
  }, 1000);
};

/**
 * getRating()
 * - rating is calculated on globals.moves:
 *   - globals.moves >= 35: 1 star
 *   - globals.moves >= 25 && globals.moves < 35: 2 stars
 *   - globals.moves < 25: 3 stars
 * */
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


/**
 * displayStarRating(starContainer)
 * - parameter starContainer: DOM's parent
 * 
 * The game displays a star rating (from 1 to at least 3)
 * that reflects the player's performance. At the beginning of a game, 
 * it should display at least 3 stars. After some number of moves, it should 
 * change to a lower star rating. After a few more moves, it should change to
 * a even lower star rating (down to 1). The number of moves needed to change
 * the rating is up to you, but it should happen at some point.
 * */
let displayStarRating = function(starContainer) {
  let rating = getRating();
  let stars = starContainer.querySelectorAll('i');
  for (let c = 0; c < stars.length; c++) {
    stars[c].classList = '';
    stars[c].classList.add('fa');
    c < rating ? stars[c].classList.add('fa-star') : stars[c].classList.add('fa-star-o');
  }
};
  
/**
 * displayFinalScore()
 * When a user wins the game, a modal appears to congratulate the player and 
 * ask if they want to play again. It should also tell the user how much time
 * it took to win the game, and what the star rating was.
 * */
let displayFinalScore = function() {
  globals.timeEnded = performance.now();
  let rating = getRating();
  let elapasedTimeInSeconds = (globals.timeEnded - globals.timeStarted) / 1000;
  let msg = `<p>You took ${elapasedTimeInSeconds.toFixed(1)} seconds to solve this and won ${getRating()} stars!`;
  if (rating === 3) {
    congratsTitleBarMsg.innerHTML = '&#128514; FANTASTIC!';
  }
  else if (rating === 2) {
    congratsTitleBarMsg.innerHTML = '&#128516; Great!';
  }
  else if (rating === 1) {
    congratsTitleBarMsg.innerHTML = '&#9785; Well, well, well...';
  }
  congratsMsg.innerHTML = msg;
  displayStarRating(congratsStarRatingField);

  // add vibrating visual effect to computed stars
  let stars = congratsStarRatingField.querySelectorAll('i');
  for (let c = 0; c < stars.length; c++) {
    if (stars[c].classList.contains('fa-star')) {
      stars[c].classList.add('vibrate-1');
    }
  }

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


  // Closes the congratulation modal
  congratsCloseBtn.addEventListener('click', function() {
    events.congratsModalClosing();
  });

});
