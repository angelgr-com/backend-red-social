const User = require('../models/user');

module.exports = (req, res, next) => {
  let id = req.body.id;

  User
  .findOne({
    _id: req.params.id,
  })
  .then(isAdmin => {
    if(isAdmin){
      next();
    }else {
      res.status(401).send(`The user has no admin privileges.`)
    }
  })
  .catch(error => {
    res.send(error)
  })
};