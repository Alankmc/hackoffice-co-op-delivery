const { Router } = require("express");
const {
  listUsers,
  registerUser,
  authenticateUser,
  findUserThroughAuth,
} = require("../../services/users");

module.exports = (app) => {
  const route = Router();

  app.use("/users", route);

  route.get("/login", async (req, res) => {
    try {
      const foundUser = await findUserThroughAuth(req.headers.authorization);
      if(!foundUser) {
        res.status(401).json({ message: "Wrong Authentication"});
      } else {
        res.send(foundUser);
      }
    } catch (e) {
      res.status(401).json({ message: "Wrong Authentication", error: e });
    }
  });
  route.get("/", [authenticateUser], (req, res) => {
    listUsers().then((users) => res.send(users));
  });
  route.post("/", (req, res) => res.send(registerUser(req)));
};
