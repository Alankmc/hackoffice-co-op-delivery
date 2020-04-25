const { Router } = require("express");
const users = require("./users");

module.exports = () => {
    const app = Router();
    users(app);

    return app
}