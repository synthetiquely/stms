export class PubSub {
  constructor() {
    this.events = {};
  }

  /**
   * Subscribe to event
   * @param  {string}   event    a unique name of an event
   * @param  {Function} callback a function to execute on event publish
   * @return {void}
   */
  subscribe(event, callback) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }

    self.events[event].push(callback);
  }

  /**
   * Publish a new data
   * @param  {string} event     a unique name of an event
   * @param  {Object} [data={}] parameters to pass to every subscribed callback
   * @return {Array}
   */
  publish(event, data = {}) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return self.events[event].map((callback) => callback(data));
  }
}
