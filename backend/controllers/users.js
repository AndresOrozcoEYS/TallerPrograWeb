const  bcrypt = require("bcrypt")
const User = require("../models/users")
const jwt = require("jsonwebtoken")

exports.create = async (req, res, next) => {
  try {
    const user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      identification: req.body.identification,
      password: req.body.password,
      active: true,
    });

    await user.save();

    res.send({ status: "OK", message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next )  => {
  const{ username, password } = req.body

  if (!username || !password){
    res.status(400).send("Username and password are required")
  }

  const user = await User.findOne({username})

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({user_id: user._id, username},  process.env.TOKENSECRET+"", {expiresIn: "2h" })
    user.token = token
    user.password = null

    res.status(200).send(user)
  }else{
    res.status(400).send("Invalid Credentials")
  }

}

exports.index = (req, res, next) => {
  User.find({}, (err, users)=>{
      if (err)
          return next(err) 
      res.send(users)
  } )
}

exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err)=>{
      if (err)
          return next(err) 
      res.send({status: "OK", message: "User updated succesfully"})
  } )
}
exports.logout = (req, res, next) => {
  // Realiza cualquier lógica adicional necesaria para el cierre de sesión

  // Elimina la información de la sesión, por ejemplo, si utilizas cookies o tokens
  // Si estás utilizando tokens, puedes invalidar el token actual o eliminarlo del almacenamiento del cliente

  // Ejemplo con cookies:
  res.clearCookie("sessionToken");

  res.send({ message: "Logout successful" });
};
exports.delete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id,(err)=>{
      if (err)
          return next(err) 
      res.send({status: "OK", message: "User deleted succesfully"})
  })
}


