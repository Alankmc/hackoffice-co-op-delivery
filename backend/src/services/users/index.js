const { User } = require('../../model/user.js');
const crypto = require("crypto");

const userList = [{
  id: "1",
  name: "João",
  email: "joao@gmail.com",
  password: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4" // "1234" in SHA256 hash
}];

let loggedUser = undefined

const listUsers = () => {
  return userList.map(i => {
    return { id: i.id, name: i.name, email: i.email }
  });
}

const registerUser = (req) => {
  const newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = crypto.createHash('sha256').update(req.body.password).digest('hex');

  userList.push(newUser);
  //TODO: Save to database

  return newUser;
}

const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return returnAuthorizationFailure(res);
  }

  const encodedAuth = authorizationHeader.split(' ');
  const credentials = Buffer.from(encodedAuth[1], 'base64').toString(); // Read credentials in base64

  const splitCredentials = credentials.split(':');
  const id = splitCredentials[0];
  const password = splitCredentials[1];
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  const foundUser = userList.find(i => i.id === id && i.password === passwordHash);
  if (!foundUser) {
    return returnAuthorizationFailure(res);
  }

  loggedUser = foundUser;

  next();
}

const getLoggedUser = () => {
  // Only works after proper authentication on authenticateUser().
  // If you're getting loggedUser as undefined, make sure to add authenticateUser() to the middleware.
  return loggedUser;
}

const returnAuthorizationFailure = (res) => {
  return res.status(401).json({ message: "Wrong Authentication"});
}

module.exports = {
    listUsers,
    registerUser,
    authenticateUser,
    getLoggedUser
}
