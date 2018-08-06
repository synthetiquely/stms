import { PubSub } from './pubsub';

export class Store {
  /**
   * Represents an application state
   * @param {{mutations?: any, actions?: any, state?: Object}} params initial params
   */
  constructor(params) {
    let self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};

    self.status = 'idle';

    self.events = new PubSub();

    if (params.hasOwnProperty('actions')) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations;
    }

    self.state = new Proxy(params.state || {}, {
      set: function(state, key, value) {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        self.events.publish('stateChange', self.state);

        if (self.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = 'idle';

        return true;
      }
    });
  }

  /**
   * Dispatch an action
   * @param  {string} type    type of an action
   * @param  {any} payload payload
   * @return {Boolean}
   */
  dispatch(type, payload) {
    let self = this;
    if (typeof self.actions[type] !== 'function') {
      console.error(`Action ${type} doesn't exist`);

      return false;
    }

    console.groupCollapsed(`ACTION: ${type}`);

    self.status = 'action';

    self.actions[type](self, payload);

    console.groupEnd();

    return true;
  }

  /**
   * Commit a change to the store
   * @param  {string} type    type of a mutation
   * @param  {any} payload payload
   * @return {Boolean}
   */
  commit(type, payload) {
    let self = this;

    if (typeof self.mutations[type] !== 'function') {
      console.error(`Mutation ${type} doesn't exist`);
      return false;
    }

    self.status = 'mutation';

    let newState = self.mutations[type](self.state, payload);

    self.state = Object.assign(self.state, newState);

    return true;
  }
}
