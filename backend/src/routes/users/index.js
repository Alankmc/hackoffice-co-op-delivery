const { Router } = require("express");
const { listUsers, registerUser, authenticateUser } = require("../../services/users");

module.exports = (app) => {
    const route = Router();

    app.use("/users", route);

    route.get('/', [authenticateUser], (req, res) => res.send(listUsers()));
    route.post('/', (req, res) => res.send(registerUser(req)));
}
