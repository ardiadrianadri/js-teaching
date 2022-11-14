import assert from 'assert';

// this time we did this kata: https://kata-log.rocks/clock-in-kata

function clockIn(gps, fetch) {
  return gps()
      .catch(() => { throw ('GPS Error')})
      .then(() => fetch()
          .catch((error) => { throw ('HTTP Error')})
      )
      .then(() => "OK")
      ;
}

describe('Clock-in kata',  () => {
  it('user clocks-in it returns a Promise', () => {
    const gps = () => null;
    const fetch = () => null;
    const maybePromise = clockIn(gps, fetch);
    assert(maybePromise instanceof Promise, 'maybePromise is NOT an instance of Promise');
    assert(maybePromise instanceof Object)
    assert.equal(typeof maybePromise, 'object')
  })
  it('user denies GPS and rejected with "GPS Error"', async () => {
    const gps = () => null;
    await assert.rejects(() => clockIn(gps), /^GPS Error$/);
  })
  it('GPS works and fetch fails, rejects with "HTTP Error"', async () => {
    const gps = () => null;
    const fetch = () => null;
    await assert.rejects(() => clockIn(gps, fetch), /^HTTP Error$/);
  });
  it('GPS works and fetch works, resolves with "OK"', async () => {
    const gps = () => null;
    const fetch = () => null;
    const result = await clockIn(gps, fetch);
    assert.strictEqual(result, "OK");
  });
  
  //it('user denies GPS and it is retried', () => {})
})