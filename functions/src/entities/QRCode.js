var QrText = require("../../util/QrText");
class QRCode {
    constructor(uid, hash, encoded) {
        this.encoded = encoded;
        this.hash = hash;
        this.counter = 0;
    }
}

module.exports = QRCode;
