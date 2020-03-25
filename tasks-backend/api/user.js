/* eslint-disable no-unused-vars */
const bycrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  const obterHash = (password, callback) => {
    bycrypt.genSalt(10, (err, salt) => {
      bycrypt.hash(password, salt, null, (_err, hash) => callback(hash));
    });
  };

  const save = (req, res) => {
    obterHash(req.body.password, (hash) => {
      const password = hash;

      app.db('users')
        .insert({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(400).json(err));
    });
  };

  return { save };
};
