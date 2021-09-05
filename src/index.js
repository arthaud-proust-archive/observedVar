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
        let i = parseInt(this.indexes[this.indexes.length-1]);
        return isNaN(i)?-1:i;
    }

    subscribe(fn, once=false) {
        let listenerId = this.lastIndex+1;
        let listener = {
            once,
            id: listenerId,
            destroy:()=>this.unsub(listenerId),
            callback: ()=>fn({ 
                id: listenerId, 
                destroy:()=>this.unsub(listenerId)
            }, this.value())
        };
        this.listeners[listenerId] = listener;
        return listener;
    }
    sub(...args) { return this.subscribe(...args); }

    once(fn, expectedValueToSubscribe) {
        if(this.value() === expectedValueToSubscribe) {
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
            listener.callback();
            if(listener.once) {
                delete this.listeners[id];
            }
        }
    }

    get version() {
        return this._version;
    }

    // don't modify directly
    value() {
        return this._value;
    }
    get() {
        return this._value;
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