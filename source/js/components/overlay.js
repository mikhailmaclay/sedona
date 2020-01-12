(function() {
  var Overlay = function (element) {
    this._element = element;
  };

  Overlay.prototype.show = function () {
    document.documentElement.classList.add('page_overlay');
    this._element.classList.add('overlay_visible');
  };

  Overlay.prototype.hide = function () {
    document.documentElement.classList.remove('page_overlay');
    this._element.classList.remove('overlay_visible');
  };

  var overlayElement = document.querySelector('.overlay');

  if (overlayElement) {
    window.overlayComponent = new Overlay(overlayElement);
  }
})();
