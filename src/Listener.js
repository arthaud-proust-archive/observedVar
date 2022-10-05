const { v4: uuidv4 } = require('uuid');

class Listener {
    constructor(ov, params) {
        this.id = uuidv4();
        this.ov = ov;
        this.callback = params.callback;
        this.once = params.once ?? false;
    }
    detach() {
        this.ov.unsubscribe(this);
    }
    runCallback() {
        this.callback(this, this.ov.value)
        if(this.once) {
            this.detach()
        }
    }
}

module.exports = {
    Listener
};