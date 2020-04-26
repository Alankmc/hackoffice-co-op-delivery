const { User } = require('../../model/user.js');

const userList = [{ id: "1", name: "João", email: "joao@gmail.com", password: "1234" }]

const listUsers = () => {
  return userList.map(i => {
    return { id: i.id, name: i.name, email: i.email }
  });
}

const registerUser = (req) => {
  const newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.setPassword(req.body.password);

  userList.push(newUser);
  //TODO: Save to database
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

  const foundUser = userList.find(i => i.id === id && i.password === password);
  if (!foundUser) {
    return returnAuthorizationFailure(res);
  }

  next();
}

const returnAuthorizationFailure = (res) => {
  return res.status(401).json({ message: "Wrong Authentication"});
}

module.exports = {
    listUsers,
    registerUser,
    authenticateUser
}
