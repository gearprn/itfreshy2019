class User {
    constructor (uid, name, nickname, id, year, imgURL, branch, bio, qrCode) {
        this.uid = uid;
        this.name = name;
        this.nickname = nickname;
        this.id = id;
        this.year = year;
        this.imgURL = imgURL;
        this.branch = branch;
        this.bio = bio;
        this.friendList = []
        this.amountOf = {
            year1: 0,
            year2: 0,
            year3: 0,
            year4: 0
        };
        this.qrCode = qrCode;
    }
}

module.exports = User
