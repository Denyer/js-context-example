'use strict';

(function (exports) {

  function EventController(eventDispatcher) {
    this._eventDispatcher = eventDispatcher;
  }

  EventController.prototype.registerListenerWrongContext = function (eventName, listener) {
    /**
     * Here context will be bound to the action method of listener, therefore `this` will be a
     * reference to MyEventDispatcher, look at MyEventDispatcher to see how it is bound.
     */
    this._eventDispatcher.addEventListener(eventName, listener.action);
  };

  EventController.prototype.registerListener = function (eventName, listener) {
    /**
     * Here context will be bound to the anonymous function NOT the action method
     */
    this._eventDispatcher.addEventListener(eventName, function (event) {
      /**
       * any reference to `this` here will be a reference to MyEventDispatcher
       *
       * we have not bound `this` to the action method therefore any reference to `this`
       * within the scope of action will be a reference to the listener object and not MyEventDispatcher
       */
      listener.action(event);
    });

    /**
     * Above is the same as creating a partial function binding the appropriate context to the call to action
     *
     * let createPartialFunction = function (listener) {
     *   return function (event) {
     *     listener.action(event)
     *   }
     * }
     *
     * Remember createPartialFunction and createPartialFunction(listener) are both functions
     * whereas createPartialFunction(listener)(event) is not
     *
     * We then use as follows, createPartialFunction(listener) is replacing the anonymous function used above
     *
     * this._eventDispatcher.addEventListener(eventName, createPartialFunction(listener));
     *
     *
     **/
  };

  exports.EventController = EventController;

})(this);