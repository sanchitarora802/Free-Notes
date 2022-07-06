const router = require('express').Router(); 
const user = require('../models/UserSchema');



router.get('/', (req, res) => {
    // console.log(req.body);
    const savedUser = user(req.body);
    savedUser.save()
    res.send('Hit successful and data saved');
  })


  module.exports = router