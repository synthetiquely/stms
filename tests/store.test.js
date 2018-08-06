import test from 'ava';
import { Store } from '../lib/store';

test('should register and dispatch actions', (t) => {
  let sum = 0;
  let store = new Store({
    actions: {
      sum: (_, payload) => {
        sum = payload.reduce((acc, i) => acc + i, 0);
      }
    }
  });

  store.dispatch('sum', [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  t.is(sum, 45);
  t.is(store.status, 'action');
});

test('should console an error if there is no such action', (t) => {
  let sum = 0;
  let store = new Store({
    actions: {}
  });

  let result = store.dispatch('sum', [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  t.is(sum, 0);
  t.false(result);
  t.is(store.status, 'idle');
});

test('should commit a change to store state', (t) => {
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

  let result = store.commit('sum', [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  t.is(store.state.sum, 45);
  t.is(store.status, 'idle');
});

test('should commit a change within an action', (t) => {
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

  store.dispatch('calculateSum', [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  t.is(store.state.sum, 45);
  t.is(store.status, 'idle');
});
