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
    };
    this.__callFlippingCardEventHandler = this.__callFlippingCardEvent.bind(this);
    this.__element.addEventListener('click', this.__callFlippingCardEventHandler);
  }


  __getHTML() {
    /*    
    <div class="flip-scene">
      <div class="flip-card">
        <div class="flip-front">
          <li class="card"></li>
        </div>
        <div class="flip-back">
          <li class="card open">
            <i class="fa fa-bomb"></i>
          </li>
        </div>
      </div>
    </div>
    */

    let divFlipScene = document.createElement('div');
    let divFlipCard = document.createElement('div');
    let divFlipFront = document.createElement('div');
    let divFlipBack = document.createElement('div');
    let liFront = document.createElement('li');
    let liBack = document.createElement('li');
    let i = document.createElement('i');

    divFlipScene.classList.add('flip-scene');
    divFlipCard.classList.add('flip-card');
    divFlipFront.classList.add('flip-front');
    divFlipBack.classList.add('flip-back');
    liFront.classList.add('card');
    liBack.classList.add('card');
    liBack.classList.add('open');
    i.classList.add('fa');
    i.classList.add(this.value);

    liBack.appendChild(i);
    divFlipBack.appendChild(liBack);
    divFlipFront.appendChild(liFront);
    divFlipCard.appendChild(divFlipBack);
    divFlipCard.appendChild(divFlipFront);
    divFlipScene.appendChild(divFlipCard);

    return divFlipScene;
  }

  getElement() {
    return this.__element;
  }

  displaySymbol() {
    this.__element.querySelector('.flip-card').classList.add('is-flipped');
  }

  hideSymbol() {
    this.__element.querySelector('.flip-card').classList.remove('is-flipped');
  }

  setAsMatch() {
    this.__element.style.cursor = 'default';
    this.__element.removeEventListener('click', this.__callFlippingCardEventHandler);
    this.__element.classList.add('wobble-hor-bottom');
    setTimeout(function() {
      this.__element.querySelector('li').classList.add('match');
    }.bind(this), 500);
  }

  unsetAsMatch() {
    this.__element.querySelector('li').classList.remove('match');
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
