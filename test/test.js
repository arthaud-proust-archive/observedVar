const assert = require('assert');
const { ObservedVar } = require('../src/index');

describe('ObserverVar', function () {
    describe('#init', function () {
        it('can be initialed with a string', function (done) {
            const ov = new ObservedVar('test');
            done();
        })
        it('can be initialed with a number', function (done) {
            const ov = new ObservedVar(9);
            done();
        })
        it('can be initialed without value', function (done) {
            const ov = new ObservedVar();
            done();
        })
    })

    describe('#value', function () {
        it('should be equals to 2 when using .set(2)', function () {
            const ov = new ObservedVar(1);
            ov.set(2);
            assert.equal(ov.get(), 2);
        })

        it('should be equals to 2 when setting .value to 2', function () {
            const ov = new ObservedVar(1);
            ov.value = 2;
            assert.equal(ov.value, 2);
        })

        it('should call all listeners', function () {
            let a, b;
            const ov = new ObservedVar(1);

            const changeAWithNewValue = (l, newValue)=>a=newValue;
            const changeBWithNewValue = (l, newValue)=>b=newValue;

            ov.subscribe(changeAWithNewValue);
            ov.subscribe(changeBWithNewValue);

            ov.value = 2;

            assert.equal(a, 2);
            assert.equal(b, 2);
        })
    })

    describe('#subscribe', function () {
        it('should add and return listener', function () {
            const ov = new ObservedVar(1);
            const listener = ov.subscribe(()=>{});
            assert.equal(listener, Object.values(ov.listeners)[0]);
        })
    });

    describe('#unsubscribe', function () {
        it('should remove listener', function () {
            const ov = new ObservedVar(1);
            const listener = ov.subscribe(()=>{});

            ov.unsubscribe(listener);

            assert.equal(Object.values(ov.listeners).length, 0);
        })
    });
});

describe('Listener', function () {
    describe('#detach', function () {
        it('should remove listener', function () {
        const ov = new ObservedVar(1);
        const listener = ov.subscribe(()=>{});

        listener.detach();

        assert.equal(Object.values(ov.listeners).length, 0);
        })
    })
});