/*global performance*/
/*global Cards*/

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

    soundEvents.setSoundCardClick(soundCardClick);
    soundEvents.setSoundCardMatch(soundCardMatch);
    soundEvents.setSoundEndingGame(soundEndingGame);

    animationEvents.setCongratsModal(congratsModal);
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

    // matching event: useful to trigger sounds, animations, etc.
    events.matchingCards();
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

    // trigger event: useful for animations, sound effects, etc.
    events.congratsModalOpening(this.getRating());
  }
};
