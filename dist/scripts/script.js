(function (factory) {
    typeof define === 'function' && define.amd ? define('script', factory) :
    factory();
}((function () { 'use strict';

    $('body').ready(function () {
      $('#formClient').submit(function (event) {
        $(".open-modal").click();
        event.preventDefault();
      });
    });

})));
