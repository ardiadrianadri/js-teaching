import assert from 'assert';

class Singleton {
  constructor() {
    this.value = '';
    this.tokenResorce = new Date().getTime();
  }

  getTokenResource() {
    return this.tokenResorce;
  }
  
}


describe(`
 The singleton pattern is a design pattern that restricts the instantiation of a class to one object.
`, () => {

  it(`
  So the main idea is that, instead to distribute an class,
  we distribute an single instance of the class for the whole app
  `, () => {
    const objA = new Singleton();
    const objB = new Singleton();

    assert.equal(objA === objB, true);
  });


  it(`
    One of the reason to use the singleton pattern is to have a global state.
  `, () => {
    const objA = new Singleton();
    const objB = new Singleton();

    objA.value = 'some value';
    assert.equal(objB.value, 'some value');
  });

  it(`
   Another reaso to use the singleton pattern is to have a global access point to a resource.
  `, () => {
    const objA = new Singleton();
    const objB = new Singleton();

    assert.equal(objA.getTokenResource() === objB.getTokenResource(), true);
  });
});