const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)  => {
  console.log("verifyToken");
  let token = req.body.token || req.headers.authorization
  console.log(token)
  if (!token){
    return res.status(403).send("Forbidden")
  }
  
  try {
    token = token.substring(7, token.length)
    console.log("I am a token: "+token)
    console.log("I am the secret token " +"ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    console.log('verified token:', jwt.verify(token, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
    const decoded = jwt.verify(token,"ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    req.user = decoded
  } catch(err){
    return res.status(403).send("Invalid token")
  }

  return next()
}


module.exports = verifyToken