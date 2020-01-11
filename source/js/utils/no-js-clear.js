'use strict';

(function() {
  function getNoJSClass(element) {
    var noJSClass;

    element.classList.forEach(function (className) {
      if (/.+no-js/.test(className)) {
        noJSClass = className;
      }
    });

    return noJSClass;
  }

  document.querySelectorAll('[class*=no-js]').forEach(function (element) {
    var noJSClass = getNoJSClass(element);

    element.classList.remove(noJSClass);
  });
})();
