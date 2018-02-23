'use strict';

(function (exports) {

  function MyEventDispatcher() {
    this.listeners = {};
    this._context = '`this` is a reference to MyEventDispatcher';
  }

  MyEventDispatcher.prototype.addEventListener = function (event, listener) {
    this.listeners[event] = listener;
  };

  MyEventDispatcher.prototype.hearEvent = function (event) {
    /**
     * Below we are calling the listener with the same context as this method
     * therefore the `this` keyword will be the MyEventDispatcher object
     * any reference to `this` in the scope of the listener function will be a reference to MyEventDispatcher
     **/
    this.listeners[event].call(this, event); //call the provided listener, maintaining the same context as this function
  };

  exports.MyEventDispatcher = MyEventDispatcher;

})(this);
