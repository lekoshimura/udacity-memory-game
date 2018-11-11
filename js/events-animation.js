/**
 * animationEvents{}
 * - play animations according to triggered events
 * */
 
let animationEvents = (function() {
  
  let __congratsModal;

  window.addEventListener('congrats-modal-opening', function() {
    fadeInCongratsModal();
  });

  window.addEventListener('congrats-modal-closing', function() {
    fadeOutCongratsModal();
  });

  let setCongratsModal = function(el) {
    __congratsModal = el;
  };

  let fadeInCongratsModal = function() {
    __congratsModal.style.display = 'flex';
    __congratsModal.classList.remove('fade-out');
    __congratsModal.classList.add('fade-in');
  };

  let fadeOutCongratsModal = function() {
    __congratsModal.classList.remove('fade-in');
    __congratsModal.classList.add('fade-out');
    setTimeout(function() {
      __congratsModal.style.display = 'none';
      __congratsModal.classList.remove('fade-out');
    }, 1000);
  };

  return {
    setCongratsModal: setCongratsModal
  };
  
})();
