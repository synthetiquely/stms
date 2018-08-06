import test from 'ava';
import { PubSub } from '../lib/pubsub';

test('new pubsub object should not have any subscribtions', (t) => {
  let pubsub = new PubSub();

  t.deepEqual(pubsub.events, {});
});

test('should be able to subscribe for event', (t) => {
  let pubsub = new PubSub();

  pubsub.subscribe('test-event', function() {
    console.log('Test');
  });

  t.true(pubsub.events.hasOwnProperty('test-event'));
});

test('should be able to publish new data', (t) => {
  let pubsub = new PubSub();
  let sum = 0;

  pubsub.subscribe('test-summ', function(data) {
    sum = data.reduce((acc, i) => acc + i, 0);
  });

  pubsub.publish('test-summ', [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  t.is(sum, 45);
});
