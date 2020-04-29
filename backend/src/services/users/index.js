const { User } = require("../../model/user.js");
const uuid = require("uuid");

const userList = [
  { id: "1", name: "João", email: "joao@gmail.com", password: "1234" }
];

const listUsers = async () => {
  const users = new User();
  users.setUserModel();
  const list = await users.list();
  return list.map(i => ({ id: i.id, name: i.name, email: i.email, password: i.password }));
};

const registerUser = req => {
  const newId = uuid.v4();
  const newUser = new User(newId);
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.setUserModel();
  newUser.setPassword(req.body.password);
  newUser.create(newUser);

  return {
    name: newUser.name, email: newUser.email, id: newId,
  }
};

const findUserThroughAuth = async (auth) => {
  const encodedAuth = auth.split(" ");
  const credentials = Buffer.from(encodedAuth[1], "base64").toString(); // Read credentials in base64
  
  const splitCredentials = credentials.split(":");
  const email = splitCredentials[0];
  const password = splitCredentials[1];
  const list = await listUsers();
  const foundUser = list.find(i => i.email === email && i.password === password);
  return foundUser;
}

const authenticateUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return returnAuthorizationFailure(res);
  }
 
  const foundUser = await findUserThroughAuth(authorizationHeader);

  if (!foundUser) {
    return returnAuthorizationFailure(res);
  }
  req.foundUser = foundUser;
  next();
};

const returnAuthorizationFailure = res => {
  return res.status(401).json({ message: "Wrong Authentication" });
};

module.exports = {
  listUsers,
  registerUser,
  authenticateUser,
  findUserThroughAuth,
};
