const { User } = require('./user');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../Database/index");
const uuid = require("uuid");

class Compra {
  constructor(id) {
    this.Compra;
    if (id) {
      this.id = id;
    } else {
      this.id = uuid.v4();
    }
    const user = new User();
    this.User = user.setUserModel();
    this.model = sequelize.define("compra", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      creatorId: {
        type: DataTypes.STRING,
        model: 'users',
        key: 'id',
      },
      products: DataTypes.TEXT,
      status: DataTypes.STRING,
      expiryDate: DataTypes.FLOAT,
      assigneeId:  {
        type: DataTypes.STRING,
        model: 'users',
        key: 'id',
      }, 
      notes: DataTypes.STRING,
      deliveryAddress: DataTypes.STRING,
      buyAddress: DataTypes.STRING,
    });
  }
  
  async list() {
    const compras = await this.Compra.findAll();
    return compras;
  }

  static createFromJson(json) {
    let compra = new Compra(Math.random());

    for (let prod in json) {
      compra[prod] = json[prod];
    }

    return compra;
  }

  async get(attributes) {
    const compras = await this.Compra.findAll({ where: attributes });
    return compras;
  }

  create(compra) {
    this.Compra.sync().then(() => {
      return this.Compra.create({
        id: this.id,
        creatorId: compra.creatorId,
        products: compra.products,
        status: 'NEW',
        expiryDate: compra.expiryDate,
        assigneeId: null,
        notes: compra.notes,
        deliveryAddress: compra.deliveryAddress,
        buyAddress: compra.buyAddress,
      });
    });
  }

  getModel() {
    return this.model;
  }

  setCompraModel() {
    this.Compra = this.model;
  }

  async update(...arg) {
    await this.Compra.sync()
    return await this.Compra.update(...arg);
  }

  // update(json) {
  //   for (let prop in json) {
  //     this[prop] = json[prop];
  //   }
  //   return this;
  // }
}

module.exports = {
  Compra,
};
