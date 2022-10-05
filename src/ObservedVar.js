const { Listener } = require('./Listener');

class ObservedVar {
    constructor(value) {
        this._value = value;

        this._version = 0;

        this.listeners = {};
    }



    subscribe(callback, once=false) {
        if(!callback) {
            throw new Error('Callback is expected as first argument')
        }

        const listener = new Listener(this, {
            callback,
            once,
        });

        this.listeners[listener.id] = listener;

        return listener;
    }
    sub(...args) { return this.subscribe(...args); }

    once(fn, expectedValueToSubscribe) {
        if(this.get() === expectedValueToSubscribe) {
            this.subscribe(fn, true);
        } else {
            fn();
        }
    }



    unsubscribeFromId(id) {
        delete this.listeners[id];
    }

    unsubscribe(listener) {
        this.unsubscribeFromId(listener.id);
    }

    unsub(listener) {
        return this.unsubscribe(listener);
    }



    fire() {
        Object.values(this.listeners).forEach(listener=>{
            listener.runCallback();
        })
    }



    get version() {
        return this._version;
    }

    // don't modify directly
    get() {
        return this._value;
    }
    set(value) {
        this._version++;
        this._value = value;
        this.fire();
    }

    set value(value) {
        this.set(value);
    }

    get value() {
        return this._value;
    }
}

module.exports = {
    ObservedVar,
    Ov: ObservedVar
}