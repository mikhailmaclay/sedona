(function() {
  var Conditions = {
    isIE11: /*@cc_on!@*/false || !!document.documentMode,
    isFirefox: typeof InstallTrigger !== 'undefined'
  };
  Conditions.isEdge = Conditions.isIE11 && !!window.StyleMedia;

  if (Conditions.isIE11) {
    document.documentElement.classList.add('page_ie11');
  }

  if (Conditions.isFirefox) {
    document.documentElement.classList.add('page_firefox');
  }

  if (Conditions.isEdge) {
    document.documentElement.classList.add('page_edge');
  }
})();
