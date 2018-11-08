let soundEvents = (function() {
  
  let __soundCardClick, __soundCardMatch, __soundEndingGame;

  window.addEventListener('flipping-cards', function() {
    __soundCardClick.play();
  });

  window.addEventListener('matching-cards', function() {
    setTimeout(function() {
      __soundCardMatch.play();
    }, 200);
  });

  window.addEventListener('congrats-modal-opening', function() {
    __soundEndingGame.play();
  });

  window.addEventListener('congrats-modal-closing', function() {
    if (!__soundEndingGame.ended) {
      __soundEndingGame.pause();
      __soundEndingGame.currentTime = 0;
    }
  });

  let setSoundCardClick = function(el) {
    __soundCardClick = el;
  };
  let setSoundCardMatch = function(el) {
    __soundCardMatch = el;
  };
  let setSoundEndingGame = function(el) {
    __soundEndingGame = el;
  };
  
  return {
    setSoundCardClick: setSoundCardClick,
    setSoundCardMatch: setSoundCardMatch,
    setSoundEndingGame: setSoundEndingGame
  }

})();
