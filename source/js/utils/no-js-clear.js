(function() {
  function getNoJSClass(element) {
    var classList = Array.from(element.classList);

    for (var i = 0; i < classList.length; i++) {
      var className = classList[i];

      if (/.+no-js/.test(className)) {
        return className;
      }
    }
  }

  Array.from(document.querySelectorAll('[class*=no-js]')).forEach(function (element) {
    var noJSClass = getNoJSClass(element);

    element.classList.remove(noJSClass);
  });
})();
