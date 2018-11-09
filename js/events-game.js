/* global performance*/
/* global globals*/
/* global lockMatchingCards*/
/* global hideNonMatchingCards*/
/* global displayMoves*/
/* global displayStarRating*/
/* global starRatingField*/
/* global displayFinalScore*/

/**
 * gameEvents{}
 * - Defines the matching logic
 * */

let gameEvents = (function() {

  window.addEventListener('flipping-cards', function(e) {
    flippingCards(e);
  });

  let flippingCards = function(e) {
    let card = e.detail;
    if (globals.waitForTimeout || globals.status !== 'ready')
      return;
    // - display the card's symbol
    card.displaySymbol();
    // - add the card to a *list* of "open" cards
    switch (globals.openCards.length) {
      case 0:
        globals.openCards.push(card);
        break;
      case 1:
        //if the clicked card is the same, skip this
        if (globals.openCards[0] === card) {
          return;
        }
        globals.openCards.push(card);
        // - if the cards do match, lock the cards in the open position
        // - if the cards do not match, remove the cards from the list and hide the card's symbol
        globals.openCards[0].value === globals.openCards[1].value ? lockMatchingCards() : hideNonMatchingCards();
        // - increment the move counter and display it on the page
        globals.moves++;
        displayMoves(true);
        // - The game displays a star rating
        displayStarRating(starRatingField);
        // - if all cards have matched, display a message with the final score
        // - end the game
        if (globals.matchingCards === globals.cards.items.length) {
          globals.timeEnded = performance.now();
          displayFinalScore();
          globals.status = 'ended';
        }
        break;
      default:
    }
  };

  return {
    flippingCards: flippingCards
  };

})();
