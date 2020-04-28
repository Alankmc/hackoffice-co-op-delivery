const { User } = require('../../model/user.js');
const crypto = require("crypto");

let loggedUser = undefined

const listUsers = async () => {
  const users = new User();
  users.setUserModel();
  const list = await users.list();
  return list.map(i => ({ id: i.id, name: i.name, email: i.email }));
};

const registerUser = req => {
  const newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
  newUser.setUserModel();

  newUser.create(newUser);
};

const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return returnAuthorizationFailure(res);
  }

  const encodedAuth = authorizationHeader.split(" ");
  const credentials = Buffer.from(encodedAuth[1], "base64").toString(); // Read credentials in base64

  const splitCredentials = credentials.split(":");
  const id = splitCredentials[0];
  const password = splitCredentials[1];
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  const foundUser = listUsers().find(i => i.id === id && i.password === passwordHash);
  if (!foundUser) {
    return returnAuthorizationFailure(res);
  }

  loggedUser = foundUser;

  next();
};

const getLoggedUser = () => {
  // Only works after proper authentication on authenticateUser().
  // If you're getting loggedUser as undefined, make sure to add authenticateUser() to the middleware.
  return loggedUser;
}

const returnAuthorizationFailure = (res) => {
  return res.status(401).json({ message: "Wrong Authentication" });
}

module.exports = {
    listUsers,
    registerUser,
    authenticateUser,
    getLoggedUser
}
