import assert from 'assert';

function factoryFactorial (limit=-1) {
  return null
}


describe(`
  The factory pattern is anthoer way to reuse logic besides inheritance.
`, () => {
  it(`
    With factory patter you can create a factory function that returns a function with the logic you want to reuse.
  `, () => {
    const factorial = factoryFactorial();
    const factorial5 = factorial(5);
    const factorial10 = factorial(10);
    assert.equal(factorial5, 120);
    assert.equal(factorial10, 3628800);
   
  });

  it(`
    With factory patter you can have a configuration logic to create more flexible functions.
  `, () => {
    const factorialLimit5 = factoryFactorial(5);
    const factorialLimit2 = factoryFactorial(2);

    const factorial5Limit5 = factorialLimit5(5);
    const factorial5Limit2 = factorialLimit2(5);

    assert.equal(factorial5Limit5, 120);
    assert.equal(factorial5Limit2, 20);
  });
});