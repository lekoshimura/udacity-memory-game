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
    this.turnedDown = true;
  }
  getHTML() {
    /*
    <li class="card">
    <i class="fa fa-diamond"></i>
    </li>
    */
    let li = document.createElement('li');
    let i = document.createElement('i');
    li.classList.add('card');
    // li.classList.add('match');
    i.classList.add('fa');
    i.classList.add(this.value);
    li.appendChild(i);
    return li;
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
    };
  }
  shuffle() {
    shuffle(this.items);
  }
}

let game = {
  reset: function() {
    this.timeStarted = null;
    this.timeEnded = null;
    this.starsRating = 0;
    this.moves = 0;

    this.cards = new Cards();
    this.cards.build();
    this.cards.shuffle();
  },
  addCardsToContainer(container) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < this.cards.items.length; i++) {
      let cardHTML = this.cards.items[i].getHTML();
      fragment.appendChild(cardHTML);
    }
    container.appendChild(fragment);
  }
};

game.reset();
let container = document.querySelector('.deck');
game.addCardsToContainer(container);

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
