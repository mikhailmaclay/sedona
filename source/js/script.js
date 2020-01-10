'use strict';

var RIGHT_MOUSE_BUTTON_KEYCODE = 0;

var Elements = {
  page: document.querySelector('.page'),
  navigation: document.querySelector('.navigation'),
  navigationClose: document.querySelector('.navigation__close'),
  menuButton: document.querySelector('.button_menu'),
  map: document.querySelector('.map')
};

if (/*@cc_on!@*/false || !!document.documentMode) {
  Elements.page.classList.add('page_ie11');
}

if (typeof InstallTrigger !== 'undefined') {
  Elements.page.classList.add('page_firefox');
}

if ((!/*@cc_on!@*/false || !!document.documentMode) && !!window.StyleMedia) {
  Elements.page.classList.add('page_edge');
}

if (Elements.navigation) {
  Elements.navigation.classList.remove('navigation_no-js');

  function handleMatchmedia() {
    Elements.navigation.classList.remove('navigation_visible');

    window.matchMedia('(min-width: 768px)').removeListener(handleMatchmedia);
  }

  Elements.menuButton.addEventListener('click', function(clickEvt) {
    if (clickEvt.button === RIGHT_MOUSE_BUTTON_KEYCODE) {
      Elements.navigation.classList.add('navigation_visible');

      window.matchMedia('(min-width: 768px)').addListener(handleMatchmedia);
    }
  });

  Elements.navigationClose.addEventListener('click', function(clickEvt) {
    if (clickEvt.button === RIGHT_MOUSE_BUTTON_KEYCODE) {
      Elements.navigation.classList.remove('navigation_visible');
    }
  });
}

if (Elements.map) {
  Elements.map.classList.remove('map_no-js');
}
