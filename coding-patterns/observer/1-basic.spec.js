import assert from 'assert';
import Sinon from 'sinon';

class Observable {}

describe.skip(`
  The observer pattern is a design pattern that defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
`, () => {
  it(`
    The observer pattern is useful when you want to notify a group of objects when something changes.
  `, () => {
    const observable = new Observable();
    const observerA = data => assert.equal(data, 'data');
    const observerB = data => assert.equal(data, 'data');

    observable.subscribe(observerA);
    observable.subscribe(observerB);

    observable.notify('data');
  });

  it(`
    Another use of the observable patter is when you want to sincronize the state of a group of objects.
  `, () => {
    const bar = { value: undefined };
    const foo = { value: undefined };

    const observable = new Observable();
    const observerA = data => { bar.value = data; };
    const observerB = data => { foo.value = data; };

    observable.subscribe(observerA);
    observable.subscribe(observerB);
    
    observable.notify('syncronized 1');

    assert.equal(bar.value, ('syncronized 1'));
    assert.equal(foo.value, ('syncronized 1'));

    observable.notify('syncronized 2');

    assert.equal(bar.value, 'syncronized 2');
    assert.equal(foo.value, 'syncronized 2');
  });

  it(`
    The observable patter is not asyncronous
  `, () => {
    const consoleSpy = Sinon.spy(console, 'log');

    const observable = new Observable();
    const observerA = data => console.log(data);
    const observerB = data => {
      const nextData = data + 1;
      console.log(nextData);
    }

    observable.subscribe(observerA);
    observable.subscribe(observerB);

    observable.notify(1);
    observable.notify(2);

    const firstCall = consoleSpy.getCall(0).args[0];
    const secondCall = consoleSpy.getCall(1).args[0];
    const thirdCall = consoleSpy.getCall(2).args[0];
    const fourthCall = consoleSpy.getCall(3).args[0];

    assert.equal(firstCall, 1);
    assert.equal(secondCall, 2);
    assert.equal(thirdCall, 2);
    assert.equal(fourthCall, 3);
  });
});