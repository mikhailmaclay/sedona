(function () {
  var RIGHT_MOUSE_BUTTON_KEYCODE = 0;

  function handleMatchmedia() {
    window.navigationComponent.hide();

    window.matchMedia('(min-width: 768px)').removeListener(handleMatchmedia);
  }

  var Navigation = function (element) {
    this._element = element;

    this._open = document.querySelector('.button_menu');
    this._close = this._element.querySelector('.navigation__close');
  };

  Navigation.prototype.show = function () {
    this._element.classList.add('navigation_visible');
  };

  Navigation.prototype.hide = function () {
    this._element.classList.remove('navigation_visible');
  };

  Navigation.prototype.addEventListeners = function () {
    document.body.addEventListener('click', (function(clickEvt) {
      var element = clickEvt.target;

      if (clickEvt.button === RIGHT_MOUSE_BUTTON_KEYCODE) {
        if (element === this._open) {
          this.show();

          window.matchMedia('(min-width: 768px)').addListener(handleMatchmedia);
        }

        if (element === this._close) {
          this.hide();
        }
      }
    }).bind(this));
  };

  var navigationElement = document.querySelector('.navigation');

  if (navigationElement) {
    var navigationComponent = new Navigation(navigationElement);

    navigationComponent.addEventListeners();

    window.navigationComponent = navigationComponent;
  }
})();
