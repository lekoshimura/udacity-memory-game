var soundEffects = (function() {
  /* Sounds and Special Effects Selectors */
  let soundCardClick = document.querySelector('.sound-card-click');
  let soundCardMatch = document.querySelector('.sound-cards-match');
  let soundEndingGame = document.querySelector('.sound-ending-game');

  window.addEventListener('flipping-cards', function() {
    soundCardClick.play();
  });

  window.addEventListener('matching-cards', function() {
    setTimeout(function() {
      soundCardMatch.play();
    }, 200);
  });

  window.addEventListener('final-score-opening', function() {
    soundEndingGame.play();
  });

  window.addEventListener('final-score-closing', function() {
    if (!soundEndingGame.ended) {
      soundEndingGame.pause();
      soundEndingGame.currentTime = 0;
    }
  });
})();
