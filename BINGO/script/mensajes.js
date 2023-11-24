function showSuccessMessage() {
    showOverlay();
    showModal('¡Has Ganado!', 'success');
  }

  function showErrorMessage() {
    showOverlay();
    showModal('¡Has Perdido!', 'error');
  }

  function showWarningMessage() {
    showWarning('¡Carta incorrecta!');
  }

  function showOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }

  function hideOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }

  function showModal(message, messageType, duration = 3000) {
    var modal = document.getElementById('myModal');
    var modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = message;
    modalContent.className = 'modal-content ' + messageType;

    modal.style.display = 'block';
    modal.style.background = messageType;
    setTimeout(function () {
      modal.style.animation = 'fadeOut 0.5s ease-in-out';
    }, duration - 500); // Comienza a desvanecerse 0.5 segundos antes

    setTimeout(function () {
      hideModal();
      hideOverlay();
    }, duration); // Ocultar el modal después de la duración especificada
  }

  function showWarning(message) {
    var warning = document.getElementById('warning');
    warning.innerHTML = message;
    warning.style.display = 'block';

    setTimeout(function () {
      warning.style.animation = 'fadeOut 0.5s ease-in-out';
    }, 2500); // Comienza a desvanecerse 0.5 segundos antes

    setTimeout(function () {
      warning.style.display = 'none';
    }, 3000); // Ocultar después de 3 segundos
  }

  function hideModal() {
    var modal = document.getElementById('myModal');
    modal.style.animation = ''; // Restablecer la animación
    modal.style.display = 'none';
  }