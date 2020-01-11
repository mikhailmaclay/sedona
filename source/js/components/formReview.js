(function() {
  function createXHR(onSuccess, onError, onTimeout) {
    var TIMEOUT = 0;
    var xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT;

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });

    if (!onTimeout) {
      onTimeout = onError;
    }

    xhr.addEventListener('timeout', function () {
      onTimeout('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  function handleSuccess() {
    window.modalSuccess.show();
  }

  function handleError() {
    window.modalError.show();
  }

  function handleSubmit(submitEvt) {
    submitEvt.preventDefault();

    var element = submitEvt.target;

    var data = new FormData(element);

    var xhr = createXHR(handleSuccess, handleError);

    xhr.open('POST', 'https://echo.htmlacademy.ru');
    xhr.send(data);
  }

  var FormReview = function (element) {
    this._element = element;
  };

  FormReview.prototype.addEventListeners = function () {
    this._element.addEventListener('submit', handleSubmit);
  };

  var formReviewElement = document.querySelector('.form_review');

  if (formReviewElement) {
    var formReviewComponent = new FormReview(formReviewElement);

    formReviewComponent.addEventListeners();
  }
})();
