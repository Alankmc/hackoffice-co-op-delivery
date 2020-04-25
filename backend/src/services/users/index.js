const { User } = require('../../model/user.js');

const userList = [{ id: 1, name: "João", email: "joao@gmail.com", password: "1234" }]

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

module.exports = {
    listUsers,
    registerUser
}
