const { DataTypes } = require("sequelize");
const { sequelize } = require("../Database/index");

class User {
  constructor() {
    this.User;
  }

  create(user) {
    this.User.sync().then(() => {
      return this.User.create({
        name: user.name,
        email: user.email,
        password: user.password
      });
    });
  }

  async list() {
    const users = await this.User.findAll();
    return users;
  }

  setUserModel() {
    this.User = sequelize.define("user", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    });
  }
}

module.exports = {
  User
};
