/*global Event*/
/*global CustomEvent*/

// events: useful to trigger sounds, animations, etc.
let events = (function() {

  let flippingCard = function(card) {
    let event = new CustomEvent('flipping-cards', { detail: card });
    window.dispatchEvent(event);
  };

  let matchingCards = function() {
    let e = new Event('matching-cards');
    window.dispatchEvent(e);
  };

  let congratsModalOpening = function(stars) {
    let e = new CustomEvent('congrats-modal-opening', { detail: stars });
    window.dispatchEvent(e);
  };

  let congratsModalClosing = function(stars) {
    let e = new CustomEvent('congrats-modal-closing');
    window.dispatchEvent(e);
  };

  return {
    flippingCard: flippingCard,
    matchingCards: matchingCards,
    congratsModalOpening: congratsModalOpening,
    congratsModalClosing: congratsModalClosing
  };
})();
