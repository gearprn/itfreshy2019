var randomstring = require("randomstring");

class QRCode {
    constructor() {
        this.encoded = 0;
        this.hash = randomstring.generate(7);
        this.counter = 0;
    }
}

module.exports = QRCode;
