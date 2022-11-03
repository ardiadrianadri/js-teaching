import assert from 'assert';

class Observable {}

class Observer {}

describe(`
  An operator is a function used to transform the data emitted by an observable.
`, () => {
  it('should allow to transform the data emitted by an observable', () => {
    const observable = new Observable();
    const observer = new Observer(
      data => assert.equal(data, 2),
      error => assert.fail(error)
    );

    observable.subscribe(observer);
    observable.operator(data => data * 2);
    observable.notify(1);
  });

  it('should allow to chain operators', () => {
    const observable = new Observable();
    const observer = new Observer(
      data => assert.equal(data, 4),
      error => assert.fail(error)
    );

    observable.subscribe(observer);
    observable
      .operator(data => data * 2)
      .operator(data => data * 2);
    observable.notify(1);
  });
});