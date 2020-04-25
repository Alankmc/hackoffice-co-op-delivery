const uuid = require("uuid");
const crypto = require("crypto");

class User {

  constructor(id) {
    if (id) {
      this.id = id;
    } else {
      this.id = uuid.v4();
    }
  }

  setPassword(password) {
    this.password = crypto.createHash('sha256').update(password).digest('hex');
  }
}

module.exports = {
  User
}
