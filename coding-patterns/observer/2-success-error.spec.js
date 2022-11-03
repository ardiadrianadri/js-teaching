import assert from 'assert';

class Observable {}

class Observer {}

describe.skip(`
 The observer can be used to handle success and error cases for observables events.
`, () => {
  it(`
    You can declare a next function to handle the success case and an error function to handle the error case.
  `, () => {
    const errorMsg = "I don't like 2";
    const observer = new Observer(
      data => {
        if (data === 2) {
          throw new Error(errorMsg);
        }
  
        assert.equal(data, 1);
      },
      error => {
        assert.equal(error.message, errorMsg);
      }
    );
    const observable = new Observable();

    observable.subscribe(observer);
    observable.notify(1);
    observable.notify(2);
  });
});
