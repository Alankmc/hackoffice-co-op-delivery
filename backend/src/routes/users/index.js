const { Router } = require("express");
const { listUsers } = require("../../services/users");

module.exports = (app) => {
    const route = Router();

    app.use("/users", route);

    route.get('/', (req, res) => res.send(listUsers()));
}
