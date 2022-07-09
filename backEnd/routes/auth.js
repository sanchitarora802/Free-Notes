const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/UserSchema');


//  console.log("check1")





router.post('/signup',
  [body('name', 'Name should be greater than 3').isLength({ min: 3 }),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password should be greater than 3').isLength({ min: 5 })],
  async (req, res) => {
  try {
    // console.log("check2")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    // console.log(req.body.email)
      let incomingUser =  await User.findOne({email: req.body.email});
      // console.log(incomingUser)
      if (incomingUser)
          return res.status(400).json({ "errors": "Email already registered"});

          // console.log("check4")
       incomingUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      res.json({
        email: req.body.email,
        message: "Registered Successfully"
      });
    }
    catch
    {
      return res.status(400).json({ "errors": "Some error occured please try again later"});
    }
  })



module.exports = router