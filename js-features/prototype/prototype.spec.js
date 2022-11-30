import assert from 'assert';

describe('How it works???', () => {
    it('object literal has NO property "prototype"', () => {
        assert.strictEqual('prototype' in {}, 'fail');
    });
    it('object literal has a prototype of Object', () => {
        assert.strictEqual(Reflect.getPrototypeOf({}), 'fail');
    });
    it('Object built-in has property prototype', () => {
        assert.strictEqual('prototype' in Object, true);
    });
    it('Object built-in has prototype of Function', () => {
        assert.strictEqual(Reflect.getPrototypeOf(Object), 'fail');
    });
    it('new Object() has prototype of Object', () => {
        assert.strictEqual(Reflect.getPrototypeOf(new Object()), 'fail');
    });
    it('Object.create() has prototype of Object', () => {
        assert.strictEqual(Reflect.getPrototypeOf(Object.create(null)), 'fail');
    });
    it('Number built-in has a prototype', () => {
        assert.strictEqual('prototype' in Number, 'fail');
    });
    it('new Number(7) built-in has NO prototype', () => {
        assert.strictEqual('prototype' in (new Number(7)), 'fail');
    });
    it('new Number(7) === 7', () => {
        assert.strictEqual(typeof new Number(7), 'fail');
        assert.strictEqual(typeof 7, 'fail');
        assert.equal(new Number(7), 'fail');
    });
    it('7 has NO prototype', () => {
        assert.throws(() => 'prototype' in 7, 'fail');
    });
    it('Function built-in has a prototype', () => {
        assert.strictEqual('prototype' in Function, 'fail');
    });
    it('Reflect.getPrototypeOf() for Number(7)', () => {
        assert.strictEqual(Reflect.getPrototypeOf(new Number(7)), 'fail');
    });
    it('typeof of Number.prototype?', () => {
        assert.strictEqual(typeof Number.prototype, 'fail');
    });

    it('the prototype of "Object.prototype"', () => {
        assert.strictEqual(Reflect.getPrototypeOf(Object.prototype), 'fail');
    });
    it('the prototype of "Function.prototype"', () => {
        assert.strictEqual(Reflect.getPrototypeOf(Function.prototype), 'fail');
    });
    it('the prototype of "Function.prototype.prototype"', () => {
        assert.strictEqual(
            Reflect.getPrototypeOf(
                Reflect.getPrototypeOf(Function.prototype)), 'fail');
    });
});

describe('Learning about ...', () => {
    it('undefined as an object property, is possible', () => {
        const obj = {undefined: 4};
        assert.strictEqual(obj.undefined, 'fail');
    });
    it('prototype as an object property, is possible', () => {
        const obj = {prototype: 4};
        assert.strictEqual(obj.prototype, 'fail');
    });
    it('use "in" to test for "prototype"', () => {
        const obj = {prototype: 4};
        assert.strictEqual('prototype' in obj, 'fail');
    });
    it('"in" does ???', () => {
        const obj = {something: undefined};
        assert.strictEqual('something' in obj, 'fail');
        assert.strictEqual(obj.something, 'fail');
        assert.strictEqual(obj.a, 'fail');
    });
});

describe('What can we do with the prototype?', () => {
    it('Inheritance over 2 levels, find the prototypes', () => {
        class A {};
        class B extends A {};
        const b = new B();
        
        assert.strictEqual(Reflect.getPrototypeOf(B), 'fail');
        assert.strictEqual(Reflect.getPrototypeOf(b), 'fail');
        assert.strictEqual(
            Reflect.getPrototypeOf(Reflect.getPrototypeOf(b)), 
            'fail');
        assert.strictEqual(
            Reflect.getPrototypeOf(
                Reflect.getPrototypeOf(
                    Reflect.getPrototypeOf(b))), 
                    'fail');
    });
    it('Inheritance over 2 levels, old style', () => {
        const A = function() {};
        const B = function() {};
        Reflect.setPrototypeOf(B, A);
        const b = new B();
        
        assert.strictEqual(Reflect.getPrototypeOf(B), 'fail');
        assert.strictEqual(Reflect.getPrototypeOf(b), 'fail');
    });
});