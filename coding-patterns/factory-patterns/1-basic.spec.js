import assert from 'assert';
import Sinon from 'sinon';

function loggerFactory (key) {
  return null
}


describe(`
  The factory pattern is a creational design pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created.
`, () => {
  it(`
    The factory pattern is useful when you want to create objects without exposing the instantiation logic to the client.
  `, () => {
    const consoleSpy = Sinon.spy(console, 'log');
    const dateString = 'Fri, 18 Nov 2022 08:22:50 GMT';
    const key = 'first test';
    const message = 'first test message';
    Sinon.stub(Date.prototype, 'toUTCString').returns(dateString);
    const expectedLog = `${dateString} - ${key}: ${message}`;
    const logger = loggerFactory('first test');
    logger(message);
    assert.equal(consoleSpy.calledWith(expectedLog), true);
  });
});