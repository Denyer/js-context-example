'use strict';

(function(exports) {

  function MyListener() {
    this._context = '`this` is a reference to MyListener';
  }

  MyListener.prototype.action = function (event) {
    console.log({event, context: this._context});
  };

  exports.MyListener = MyListener;

})(this);