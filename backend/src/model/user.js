const uuid = require("uuid");
const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../Database/index");

class User {
  constructor(id) {
    this.User;
    if (id) {
      this.id = id;
    } else {
      this.id = uuid.v4();
    }
    this.model = sequelize.define("user", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    });
  }

  create(user) {
    this.User.sync().then(() => {
      return this.User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        id: this.id,
      });
    });
  }

  async list() {
    const users = await this.User.findAll();
    return users;
  }

  getModel() {
    return this.model;
  }

  setUserModel() {
    this.User = this.model;
  }

  setPassword(password) {
    this.password = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
  }
}

module.exports = {
  User
};
