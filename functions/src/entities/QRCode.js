class QRCode {
    constructor(hash) {
        this.encoded = 0;
        this.hash = hash;
        this.counter = 0;
    }
}

module.exports = QRCode;
