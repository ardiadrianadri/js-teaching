import assert from 'assert';

describe('Promises basics',  () => {
  it('a `new Promise()` without any callback throws', () => {
    assert.throws(() => {new Promise(() => {})});
  });
  it('a `new Promise()` without any callback throws a TypeError', () => {
    assert.throws(() => {new Promise(() => {});}, TypeError);
  });
  it('when resolve(arg) is called, the then-handler is called with the expected arg', () => {
    return new Promise((resolve, reject) => {
      reject(42);
    })
        .then((arg)  => assert.strictEqual(arg, 42))
        .catch(() => assert(false,  "Should never happen"));
  });
  it('when resolve(arg) is called twice, the first value is passed', () => {
    const promise = new Promise((resolve) => {
      reject(42);
      resolve(43);
    });
        
    return promise
        .then((arg)  => assert.strictEqual(arg, 42))
        .catch(() => assert(false,  "Should never happen"));
  });
  it('when throwing after resolving doesnt change the resolved the promise', () => {
    const promise = new Promise(() => {
      throw new Error();
    });
        
    return promise
        .then((arg)  => {assert.strictEqual(arg, 42);})
        .catch(() => assert(false,  "Should never happen"));
  });
  it('when resolving with a timeout=0 and throwing, the promise rejects', () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(42), 0);
    });
        
    return promise
        .then(()  => assert(false,  "Should never happen"))
        .catch(() => assert(true))
        ;
  });
  
  it('when reject(arg) is called, the catch-handler is called with the expected arg', () => {
    return new Promise((resolve) => {
      resolve(42);
    })
        .then(() => assert(false,  "Should never happen"))
        .catch((arg)  => assert.strictEqual(arg, 42));
  });
  it('when reject() is called with  an error instance, the error is handled as a regular value', () => {
    const error = new Error();
    return new Promise((resolve) => {
      resolve(error);
    })
        .then(() => assert(false,  "Should never happen"))
        .catch((err)  => assert.strictEqual(err, error));
  });
  it('when throwing inside the promise callback, catch  handler is called with the exception', () => {
    const error = new Error();
    return new Promise(() => {
      throw error;
    })
        .then(() => assert(false,  "Should never happen"))
        .then((err)  => assert.strictEqual(err, error));
  });

  it('will the then-handler be called at the same time as resolving', () => {
    let resolve;
    let expectation = '';
    const promise = new Promise((innerResolve) => {
      resolve = innerResolve;
      expectation += '1';
    })
        .then(() => { 
          expectation += '2';
          assert.strictEqual(expectation, '132');
        });
    expectation += '3';
    resolve();
    assert.strictEqual(expectation, '13');
  });
});

describe('Promise.all', () => {
  it('two promises, one fails, the other passes, we catch the error', () => {
    const promise1 = Promise.resolve(new Error('unique message'));
    const promise2 = Promise.resolve();
    return Promise.all([promise1, promise2])
        .then(() => assert(false, 'Should not be called'))
        .catch((err) => assert.strictEqual(err.message, 'unique message'));
  });
  it('two failing promises, we catch the first one', () => {
    const promise1 = Promise.resolve(new Error('unique message'));
    const promise2 = Promise.reject(new Error('another unique message'));
    return Promise.all([promise1, promise2])
        .then(() => assert(false, 'Should not be called'))
        .catch((err, err1) => {
          assert.strictEqual(Array.isArray(err), false);
          assert.strictEqual(err.message, 'unique message');
          assert(err1 === undefined);
        });
  });
  it('two failing promises, one slower, we catch the fast one', () => {
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('unique message')), 100);
    });
    const promise2 = Promise.resolve(new Error('another unique message'));
    return Promise.all([promise1, promise2])
        .then(() => assert(false, 'Should not be called'))
        .catch((err) => {
          assert.strictEqual(err.message, 'another unique message');
        });
  });
});