const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Validations
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

//@route  GET api/users/test
//@dec    Test users route
//@sccess Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Hello, user works"
  })
);

//@route  POST api/users/register
//@dec    Register user
//@sccess Public
router.post("/register", (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    avatar;

    // Encrypt the password
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) throw err;
        // Store hash in your password DB.
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => console.log(err));
      });
    });
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const {
    errors,
    isValid
  } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey, {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

//@route  POST api/users/current
//@dec    Get the current user
//@sccess Private
router.get(
  '/current',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

router.get('/all', (req, res) => {
  User.find()
    .then(user => [
      res.json(user)
    ])
})

module.exports = router;