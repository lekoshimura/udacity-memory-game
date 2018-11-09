/*global events*/

/* types/css-classes of cards */

/**
 * cardValues[]
 * - array of types of cards
 * */

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

/**
 * class Card{}
 * - Represents one card
 * - constructor():
 * */

class Card {

  // - values: cards's type/css-class. See cardValues[];
  constructor(value) {
    this.value = value;
    this.__element = this.__getHTML();

    // As seguintes linhas, são por causa disso:
    // - https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class
    this.__callFlippingCardEvent = function() {
      events.flippingCard(this);
    }
    this.__callFlippingCardEventHandler = this.__callFlippingCardEvent.bind(this);
    this.__element.addEventListener('click', this.__callFlippingCardEventHandler);
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
    this.__element.style.cursor = 'default';
    this.__element.removeEventListener('click', this.__callFlippingCardEventHandler);
  }

  unsetAsMatch() {
    this.__element.classList.remove('match');
  }

}

/**
 * class Cards{}
 * - Represents an array of cards
 * */

class Cards {

  constructor() {
    this.items = [];
  }

  build() {
    this.items = [];
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j < cardValues.length; j++)
        // - loop through each card and create its HTML
        // - cardValues[j]: cards's type/css-class
        this.items.push(new Card(cardValues[j]));
    }
  }

  shuffle() {
    // - shuffle the list of cards using the provided "shuffle" method below
    // - shuffle function from http://stackoverflow.com/a/2450976
    var currentIndex = this.items.length,
      temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = this.items[currentIndex];
      this.items[currentIndex] = this.items[randomIndex];
      this.items[randomIndex] = temporaryValue;
    }
  }

  flipAllCardsDown() {
    this.items.forEach(function(value) {
      value.hideSymbol();
      value.unsetAsMatch();
    });
  }

}
