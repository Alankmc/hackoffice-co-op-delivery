const uuid = require("uuid");

class User {

  constructor(id) {
    if (id) {
      this.id = id;
    } else {
      this.id = uuid.v4();
    }
  }
}

module.exports = {
  User
}
