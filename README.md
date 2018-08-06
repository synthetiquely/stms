# stms

State Management System using Pub/Sub pattern

## Usage

### Basic usage

```js
let store = new Store({
  mutations: {
    sum: (state, payload) => {
      return (state.sum = payload.reduce((acc, i) => acc + i, 0));
    }
  },
  state: {
    sum: 0
  }
});

store.commit('sum', [1, 2, 3, 4, 5, 6, 7, 8, 9]); // store.state.sum is now 45
```

### Subscribe to store changes

```js
let store = new Store({
  mutations: {
    sum: (state, payload) => {
      return (state.sum = payload.reduce((acc, i) => acc + i, 0));
    }
  },
  state: {
    sum: 0
  }
});

store.events.subscribe('stateChange', (state) => console.log(`New state is ${state}`));

store.commit('sum', [1, 2, 3, 4, 5, 6, 7, 8, 9]); // New state is { sum: 45 }
```

### Using actions

### Subscribe to store changes

```js
let store = new Store({
  mutations: {
    sum: (state, payload) => {
      return (state.sum = payload.reduce((acc, i) => acc + i, 0));
    }
  },
  actions: {
    calculateSum: (store, numbers) => {
      if (Array.isArray(numbers)) {
        store.commit('sum', numbers);
      } else {
        throw Error('Pass an array of numbers to calculate their sum');
      }
    }
  },
  state: {
    sum: 0
  }
});

store.dispatch('calculateSum', [1, 2, 3, 4, 5, 6, 7, 8, 9]); // store.state.sum is now 45
```
