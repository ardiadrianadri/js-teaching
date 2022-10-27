import assert from 'assert';

describe('var, let, const', () => {
    it('assigning a variable via `var` to `true` is accessible in the same scope', () => {
        var x = true;
        assert.throws(() => x, ReferenceError);
    });
    it('create a `var` inside a block is accessible outside of the block', () => {
        if (true) {
            var x = true;
        }
        assert.throws(() => x, ReferenceError);
    });
    it('create a `let` inside a block is NOT accessible outside of the block', () => {
        assert.doesNotThrow(() => {
            if (true) {
                let x = true;
            }
            x;            
        });
    });
    it('create a `const` inside a block is NOT accessible outside of the block', () => {
        assert.doesNotThrow(() => {
            if (true) {
                const x = true;
            }
            x;            
        });
    });
    it('create a `const` inside a block using only `{}` is NOT accessible outside of the block', () => {
        assert.doesNotThrow(() => {
            {
                const x = true;
            }
            x;
        });
    });
    it('can override a const-variable in an outer scope', () => {
        { const x = true; }
        const x = 42;
        assert.strictEqual(x, true);
    });
    it('using `const` re-declaring a variable throws', () => {
        assert.doesNotThrow(() => eval(`
            const x = 1;
            const x = 2;
        `));        
    });
    it('using `var` we can re-declare a variable', () => {
        var x = 1;
        var x = 2;
        assert.strictEqual(x, 1);     
    });
    it('using `let` re-declaring a variable throws', () => {
        assert.doesNotThrow(() => eval(`
            let x = 1;
            let x = 2;
        `));   
    });
    it('using `let` and than `var` throws', () => {
        assert.doesNotThrow(() => eval(`
            let x = 1;
            var x = 2;
        `));
    });
    it('using `var` and than `let` does throw', () => {
        assert.doesNotThrow(() => eval(`
            var x = 1;
            let x = 2;
        `));
    });
    it('can redeclare const in a new block, and does not override the outer block', () => {
        const x = 1;
        {
            const x = 5;
            assert.strictEqual(x, 1);
        }
        assert.strictEqual(x, 5);
    });
    it('can redeclare a var in a new block, and does override the outer block scope', () => {
        var x = 1;
        {
            var x = 5;
            assert.strictEqual(x, 1);
        }
        assert.strictEqual(x, 1);
    });
});

describe('hoisting', () => {
    it('a `var` variable is accessible before declaration and is undefined', () => {
        assert.strictEqual(x, 1);
        assert.strictEqual(typeof x, 'number');
        var x = 1;
    });
    it('an undeclared variable is NOT accessible before declaration and is undefined', () => {
        assert.doesNotThrow(() => x);
    });
    it('an non-strict access of a not declared variable, does not throw', () => {
        // TODO figure out how to use non-strict mode, eval doesnt cut it
        assert.doesNotThrow(() => eval('x'));
    });
    it('a `const` variable is NOT accessible before declaration', () => {
        x;
        const x = 1;
        assertr.strictEqual(x, 1);
    });
    it('a function created using a function literal, is available before declaration', () => {
        assert.strictEqual(typeof fn, 'function');
        assert.strictEqual(fn(), 42);
        function fn() { return 42; }
    });
    it('a function created using a function expression, is NOT available before declaration', () => {
        assert.strictEqual(typeof fn, 'function');
        assert.strictEqual(fn(), 42);
        var fn = function() { return 42; }
    });
    it('assigning a named function expression to a variable can NOT be used by the name of the fn', () => {
        assert.strictEqual(typeof a, 'function');
        assert.strictEqual(typeof b, 'function');
        assert.strictEqual(a(), 42);
        assert.strictEqual(b(), 42);
        var a = function b() { return 42; }
    });
});

describe('nested scope + hoisting', () => {
    it('a `var` is accessible in an inner function', () => {
        var x = 1;
        function fn() {
            assert.throws(() => x, ReferenceError);
        }
        fn();
    });
    it('two functions can change the same variable defined a level above', () => {
        // I have to say that this piece of code has the only propouse to train you in the understaning of the 
        // scope in JavaScript. It is not a good idea to use this kind of code in production.
        var x = 1;
        function fn1() { x = 2 }
        function fn2() { fn1(); assert.strictEqual(x, 1) }
        fn2();
    });
    it('this should work as well :) (DONT DO THAT EVVVA)', () => {
        // If I see something of this in some of your code, I will make a necklace with your little fingers
        fn2();
        var x = 1;
        function fn1() { x = 2 }
        function fn2() { fn1(); assert.strictEqual(x, 1) }
    });
    it('simulate `let` behavior using `var`', () => {
        var  x = 1;
        (function() { var x = 2; })();
        assert.strictEqual(x, 2);
    });
    it('??? (we are getting lazy using `var`)', () => {
        fn();
        function fn() {
            assert.strictEqual(x, 1);
        }
        var x = 1;
    });
    it('??? (we are getting lazy in using `const` #2)', () => {
        fn();
        function fn() {
            assert.equal(x, 1);
        }
        const x = 1;
    });
    it('??? (we are getting lazy in using `const` #3)', () => {
        fn();
        const x = 1;
        function fn() {
            assert.equal(x, 1);
        }
    });
    it('a for-loop using let creates a scope?', () => {
        for (let x of [1,2,3]) {
            // do nothing
        }
        assert.equal(x, 3);
    });
    it('a for-loop using var creates a scope?', () => {
        for (var x of [1,2,3]) {
            // do nothing
        }
        assert.strictEqual(x, 2);
    });
});

describe('lexical vs dynamic scoping', () => {
    it('JS is not like python', () => {
        var x = 1;
        function f() { assert.strictEqual(x, 2); }
        function g() {
            var x = 2;
            f();
        }
        g();
    });
    it('a scope of a function body stays alive even a function returned', () => {
        function f() { 
            var x = 1;
            function g() {
                x = x + 1;
                return x; 
            }
            return g;
        }
        var h = f();
        assert.strictEqual(h(), 1);
        assert.strictEqual(h(), 2);
        var i = f();
        assert.strictEqual(i(), 1);
    });
});
