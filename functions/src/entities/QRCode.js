var QrText = require("../../util/QrText");
class QRCode {
    constructor(uid, hash) {
        this.encoded = QrText.generate(uid, hash);
        this.uid = uid;
        this.hash = hash;
        this.counter = 0;
    }
}

module.exports = QRCode;
