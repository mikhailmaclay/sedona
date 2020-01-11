(function() {
  function handleClick(clickEvt) {
    var element = clickEvt.target;

    if (element === this._button) {
      this.hide();
    }
  }

  var Modal = function (element) {
    this._element = element;

    this._button = this._element.querySelector('.modal__button');
  };

  Modal.prototype.show = function () {
    window.overlayComponent.show();

    this._element.classList.add('modal_visible');
  };

  Modal.prototype.hide = function () {
    window.overlayComponent.hide();

    this._element.classList.remove('modal_visible');
  };

  Modal.prototype.setClickHandler = function (handler) {
    this._element.addEventListener('click', handler.bind(this));
  };

  var ModalElements = {
    error: document.querySelector('.modal_error'),
    success: document.querySelector('.modal_success')
  };

  if (ModalElements.error && ModalElements.success) {
    var modalError = new Modal(ModalElements.error);
    var modalSuccess = new Modal(ModalElements.success);

    modalError.setClickHandler(handleClick);
    modalSuccess.setClickHandler(handleClick);

    window.modalError = modalError;
    window.modalSuccess = modalSuccess;
  }
})();
