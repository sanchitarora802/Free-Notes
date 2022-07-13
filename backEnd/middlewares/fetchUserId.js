const jwt = require('jsonwebtoken')

const secretKey = "ThisKeyIsUsedForJwtTokenForTestingWebsite"


//This middleware will fetch the emailid from the auth token. 


const fetchUserId = (req,res,next) => {
//   console.log('inside middleware')
   const token = req.header('auth-token');  // get the token
//    console.log(token)
   if(!token)
   {
    res.status(401).send({error:"Please authenticate using a valid token"});
   }
  try{
    const data = jwt.verify(token,secretKey);  //verify the token
    // console.log('inside try middleware')
    req.incommingUser = data.user;            // left = details will be added in the req with user right = data is the token parameter.
    // console.log(req.incommingUser);
    next();
  }
  catch{
    return res.status(400).json({ "errors": "Some error occured please try again later"});
  }
}

module.exports = fetchUserId;

