const uuid = require("uuid"); // import { v4 as uuidv4 } from 'uuid';

const userList = [{ id: 1, name: "João" }]

const listUsers = () => userList

const registerUser = (req) => {
  const userUuid = uuid.v4();
  const newUser = {
    id: userUuid,
    name: req.body.name
  };

  userList.push(newUser);
  //TODO: Save to database
}

module.exports = {
    listUsers,
    registerUser
}
