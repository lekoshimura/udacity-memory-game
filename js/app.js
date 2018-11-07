let container = document.querySelector('.deck');
let movesField = document.querySelector('.moves');
let starRatingField = document.querySelector('.score-panel .stars');
let resetBtn = document.querySelector('.restart');
let congratsModal = document.querySelector('.congrats-modal');
let congratsTitleBarMsg = document.querySelector('.congrats-title-bar-msg');
let congratsCloseBtn = document.querySelector('.congrats-close-btn');
let congratsStarRatingField = document.querySelector('.congrats-box .stars');
let congratsMsg = document.querySelector('.congrats-msg');
let congratsPlayAgain = document.querySelector('.congrats-play-again');

const cardValues = [
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb'
];

class Card {
  constructor(value) {
    this.value = value;
    this.__element = this.__getHTML();
  }
  __getHTML() {
    /*
    <li class="card">
    <i class="fa fa-diamond"></i>
    </li>
    */
    let li = document.createElement('li');
    let i = document.createElement('i');
    li.classList.add('card');
    i.classList.add('fa');
    i.classList.add(this.value);
    li.appendChild(i);

    li.addEventListener('click', function() {
      let event = new CustomEvent('flipping', { detail: this });
      window.dispatchEvent(event);
    }.bind(this));
    return li;
  }
  getElement() {
    return this.__element;
  }
  displaySymbol() {
    this.__element.classList.add('open');
    this.__element.classList.add('show');
  }
  hideSymbol() {
    this.__element.classList.remove('open');
    this.__element.classList.remove('show');
  }
  setAsMatch() {
    this.__element.classList.add('match');
  }
  unsetAsMatch() {
    this.__element.classList.remove('match');
  }
}

class Cards {
  constructor() {
    this.items = [];
  }
  build() {
    this.items = [];
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j < cardValues.length; j++)
        this.items.push(new Card(cardValues[j]));
    }
  }
  shuffle() {
    this.items = shuffle(this.items);
  }
  flipAllCardsDown() {
    this.items.forEach(function(value) {
      value.hideSymbol();
      value.unsetAsMatch();
    });
  }
}

let game = {
  reset: function() {
    this.timeStarted = performance.now();
    this.timeEnded = null;
    this.moves = 0;
    this.openCards = [];
    this.waitForTimeout = false;
    this.matchingCards = 0;

    this.cards = null;
    this.cards = new Cards();
    this.cards.build();
    this.cards.flipAllCardsDown();
    this.cards.shuffle();
    this.movesDisplay();
    this.clearCardsFromContainer();
    this.addCardsToContainer();
    this.displayStarRating(starRatingField);
  },
  // Game displays the current number of moves a user has made.
  movesDisplay: function(increment) {
    if (increment) {
      this.moves++;
    }
    movesField.innerHTML = this.moves;
  },
  clearCardsFromContainer() {
    container.innerHTML = '';
  },
  addCardsToContainer() {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < this.cards.items.length; i++) {
      fragment.appendChild(this.cards.items[i].getElement());
    }
    container.appendChild(fragment);
  },
  lockMatchingCards: function() {
    this.openCards[0].setAsMatch();
    this.openCards[1].setAsMatch();
    this.openCards = [];
    this.matchingCards += 2;
  },
  hideNonMatchingCards: function() {
    this.waitForTimeout = true;
    window.setTimeout(function() {
      this.openCards[0].hideSymbol();
      this.openCards[1].hideSymbol();
      this.openCards = [];
      this.waitForTimeout = false;
    }.bind(this), 1000);
  },
  getRating: function() {
    if (this.moves >= 35) {
      return 1;
    }
    else if (this.moves >= 25 && this.moves < 35) {
      return 2;
    }
    else if (this.moves < 25) {
      return 3;
    }
  },
  // Star Rating | The game displays a star rating (from 1 to at least 3) 
  // that reflects the player's performance. At the beginning of a game, 
  // it should display at least 3 stars. After some number of moves, it should 
  // change to a lower star rating. After a few more moves, it should change to
  // a even lower star rating (down to 1). The number of moves needed to change
  // the rating is up to you, but it should happen at some point.
  displayStarRating: function(starContainer) {
    // debugger;
    let rating = this.getRating();
    let stars = starContainer.querySelectorAll('i');
    for (let c = 0; c < stars.length; c++) {
      stars[c].classList = '';
      stars[c].classList.add('fa');
      c < rating ? stars[c].classList.add('fa-star') : stars[c].classList.add('fa-star-o');
    }
  },
  // When a user wins the game, a modal appears to congratulate the player and 
  // ask if they want to play again. It should also tell the user how much time
  // it took to win the game, and what the star rating was.
  displayFinalScore: function() {
    // When a user wins the game, a modal appears to congratulate the player 
    // and ask if they want to play again. It should also tell the user how much
    // time it took to win the game, and what the star rating was.
    this.timeEnded = performance.now();
    let elapasedTimeInSeconds = (this.timeEnded - this.timeStarted) / 1000;
    let msg = `<p>You took ${elapasedTimeInSeconds.toFixed(1)} seconds to solve this and won ${this.getRating()} stars!`;
    if (this.getRating() === 3) {
      congratsTitleBarMsg.innerHTML = '&#128514; FANTASTIC!';
    }
    else if (this.getRating() === 2) {
      congratsTitleBarMsg.innerHTML = '&#128516; Great!';
    }
    else if (this.getRating() === 1) {
      congratsTitleBarMsg.innerHTML = '&#9785; Well, well, well...';
    }
    congratsMsg.innerHTML = msg;
    game.displayStarRating(congratsStarRatingField);
    fadeIn(congratsModal, 'flex');
  }
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

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
  game.reset();

  // * set up the event listener for a card
  window.addEventListener('flipping', function(e) {
    let card = e.detail;
    if (game.waitForTimeout)
      return;
    // - display the card's symbol
    card.displaySymbol();
    // - add the card to a *list* of "open" cards
    switch (game.openCards.length) {
      case 0:
        game.openCards.push(card);
        break;
      case 1:
        game.openCards.push(card);
        // - if the cards do match, lock the cards in the open position
        // - if the cards do not match, remove the cards from the list and hide the card's symbol
        game.openCards[0].value === game.openCards[1].value ? game.lockMatchingCards() : game.hideNonMatchingCards();
        // - increment the move counter and display it on the page
        game.movesDisplay(true); // true: increment moves count
        // - The game displays a star rating
        game.displayStarRating(starRatingField);
        // - if all cards have matched, display a message with the final score
        if (game.matchingCards === game.cards.items.length) {
          game.timeEnded = performance.now();
          game.displayFinalScore();
        }
        break;
      default:
    }
  }, false);

  // A restart button allows the player to reset the game board, the timer, and the star rating.
  resetBtn.addEventListener('click', function() {
    game.reset();
  });

  // When a user wins the game, a modal appears to congratulate the player and 
  // ask if they want to play again. It should also tell the user how much time
  // it took to win the game, and what the star rating was.
  congratsPlayAgain.addEventListener('click', function() {
    game.reset();
    fadeOut(congratsModal);
  });
  congratsCloseBtn.addEventListener('click', function() {
    fadeOut(congratsModal);
  });
});


/**
 * Effects
 */

function fadeOut(el) {
  el.classList.remove('fade-in');
  el.classList.add('fade-out');
  setTimeout(function() {
    el.style.display = 'none';
    el.classList.remove('fade-out');
  }, 1000);
}

function fadeIn(el, display) {
  el.style.display = display;
  el.classList.remove('fade-out');
  el.classList.add('fade-in');
}
