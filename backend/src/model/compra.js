class Compra {
  constructor(id) {
    this.id = id;
  }

  static createFromJson(json) {
    let compra = new Compra(Math.random());

    for (let prod in json) {
      compra[prod] = json[prod];
    }

    return compra;
  }

  update(json) {
    for (let prop in json) {
      this[prop] = json[prop];
    }
    return this;
  }
}

module.exports = {
  Compra,
};
