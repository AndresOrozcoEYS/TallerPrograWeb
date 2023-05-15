const Sede = require('../models/sedes');
const User = require('../models/users');

exports.create = async (req, res, next) => {
  try {
    const sede = new Sede({
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      city: req.body.city,
      address: req.body.address,
      owners: req.body.owners,
      zipcode: req.body.zipcode,
      active: true,
    });

    await sede.save();

    for (const ownerId of sede.owners) {
      const owner = await User.findById(ownerId);
      if (!owner) {
        return res.status(404).send({ error: "User not found" });
      }

      owner.sedes.push(sede._id);
      await owner.save();
    }

    res.send({ status: "OK", message: "Sede created successfully" });
  } catch (error) {
    next(error);
  }
};

  
  


exports.index = (req, res, next) => {
  console.log("Console log")
    Sede.find({}, (err, sedes)=>{
      console.log(req.headers)
        if (err)
            return next(err) 
        res.send(sedes)       
    } )
}

exports.show = (req, res, next) => {
    Sede.findById(req.params.id)
         .then(sede => {
             if(sede == null){
                 res.status(404).send({error: "Sede not found"})
             }else{
                 res.send(sede)
             }
         }).catch (error => {
             res.status(500).send({error: error.message})
         })
}

exports.update = (req, res, next) => {
    Sede.findByIdAndUpdate(req.params.id, {$set: req.body}, (err)=>{
        if (err)
            return next(err) 
        res.send({status: "OK", message: "Sede updated succesfully"})
    } )
}

exports.delete = async (req, res, next) => {
  try {
    const sede = await Sede.findById(req.params.id);
    if (!sede) {
      return res.status(404).send({ error: "Sede not found" });
    }
    
    if (sede.owners.length > 0) {
      return res.status(422).send({ error: "Cannot delete sede with owners" });
    }

    await Sede.findByIdAndRemove(req.params.id);
    res.send({ status: "OK", message: "Sede deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.removeOwner = async (req, res, next) => {
  try {
    const sede = await Sede.findById(req.params.id);
    if (!sede) {
      return res.status(404).send({ error: "Sede not found" });
    }

    const userId = req.params.userId;
    const index = sede.owners.indexOf(userId);

    if (index === -1) {
      return res.status(404).send({ error: "User not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    sede.owners.splice(index, 1);
    await sede.save();

    user.sedes.pull(sede._id);
    await user.save();

    res.send({ status: "OK", message: "User removed successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


  