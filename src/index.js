class ObservedVar {
    constructor(value) {
        this._value = value;

        this._version = 0;

        this.listeners = {};
    }
    
    get indexes() {
        return Object.keys(this.listeners).sort((a,b)=>parseInt(a)-parseInt(b));
    }

    get lastIndex() {
        return parseInt(this.indexes[this.indexes.length-1]);
    }

    subscribe(fn, once) {
        let listenerIndex = this.lastIndex+1;
        this.listeners[listenerIndex] = {
            once,
            fn
        }
        return {listenerIndex};
    }
    sub(...args) { return this.subscribe(...args); }

    once(fn, expectedValueToSubscribe) {
        if(this.value === expectedValueToSubscribe) {
            this.subscribe(fn, true);
        } else {
            fn();
        }
    }

    unsubscribe(i) {
        delete this.listeners[i];
    }
    unsub(...args) { return this.unsubscribe(...args); }

    fire() {
        for(const [id, listener] of Object.entries(this.listeners)) {
            listener.fn();
            if(listener.once) {
                delete this.listeners[id];
            }
        }
    }

    get version() {
        return this._version;
    }

    // don't modify directly
    get value() {
        return this._value;
    }

    get() {
        return this.value;
    }

    set(value) {
        this._version++;
        this._value = value;
        this.fire();
    }
}

module.exports = {
    ObservedVar,
    Ov: ObservedVar
}