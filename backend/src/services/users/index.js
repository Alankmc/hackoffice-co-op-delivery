const userList = [{ id: 1, name: "João" }]

const listUsers = () => userList

const registerUser = (req) => {
  // Find largest id in userList (not sure if this is necessary when adding to database)
  const largestId = userList.map(i => i.id).reduce((prev, cur) => prev > cur ? prev : cur);
  const nextId = largestId + 1;
  const newUser = {
    id: nextId,
    name: req.body.name
  };

  userList.push(newUser);
  //TODO: Save to database
}

module.exports = {
    listUsers,
    registerUser
}
