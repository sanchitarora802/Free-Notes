const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fetchUserId = require('../middlewares/fetchUserId');

const secretKey = "ThisKeyIsUsedForJwtTokenForTestingWebsite"

//  console.log("check1")

//Route 1
router.post('/signUp',
  [body('name', 'Name should be greater than 3').isLength({ min: 3 }),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password should be greater than 3').isLength({ min: 5 })],
  async (req, res) => {
    try {
      // console.log("check2")
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // console.log(req.body.email)
      let incomingUser = await User.findOne({ email: req.body.email });
      // console.log(incomingUser)
      if (incomingUser)
        return res.status(400).json({ "errors": "Email already registered" });

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt)
      // console.log("check4")
      incomingUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
      })

      //create data for jwt. Always add the the data which will be unique in DB.
      const data = {
        user: {
          name: req.body.name,
          id: req.body.email,
        }
      }

      const authtoken = jwt.sign(data, secretKey);

      res.json({
        authtoken: authtoken,
        message: "Registered Successfully"
      });
    }
    catch
    {
      return res.status(400).json({ "errors": "Some error occured please try again later" });
    }
  })

//Route 2
router.post('/signIn',
  [body('email', 'Email or Password is incorrect').isEmail(),
  body('password', 'Password can not be empty').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //  console.log(req.body.email)

      //Returns the complete object
      let incomingUser = await User.findOne({ email: req.body.email });
      // console.log(incomingUser)
      if (!incomingUser)
        return res.status(400).json({ "errors": "Email or Password is incorrect" });

      //check if the incomming password and hashed password is same for login    
      const comparePassword = await bcrypt.compare(req.body.password, incomingUser.password)
      if (!comparePassword) {
        return res.status(400).json({ "errors": "Email or Password is incorrect" });
      }


      const data = {
        user: {
          name: incomingUser.name,
          email: req.body.email,
          id: incomingUser.id
        }
      }
      const authtoken = jwt.sign(data, secretKey);
      res.json({
        authtoken: authtoken,
        message: "Login Successful"
      });
    }
    catch {
      return res.status(400).json({ "errors": "Some error occured please try again later" });
    }
  })

//Route 3 
router.post('/getUser', fetchUserId, async (req, res) => {
  try {
    let fetchedUserId = req.incommingUser.id
    // console.log(fetchedUserId)
    let fetchtheuser = await User.findById(fetchedUserId).select("-password")
    res.send(fetchtheuser)
  }
  catch {
    return res.status(400).json({ "errors": "Some error occured please try again later" });
  }
  
})

module.exports = router