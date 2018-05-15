const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
//@route  GET api/users/test
//@dec    Test users route
//@sccess Public
router.get('/test', (req, res) => res.json({
  msg: 'Hello, user works'
}))

//@route  POST api/users/register
//@dec    Register user
//@sccess Public
router.post('/register', (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        return res.status(400).json('Email already exists')
      }
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User;
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      avatar;

      // Encrypt the password
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) throw err
          // Store hash in your password DB.
          newUser.password = hash
          newUser.save()
            .then(user => {
              res.json(user)
            })
            .catch(err => console.log(err))
        });
      });
    })
})


module.exports = router;