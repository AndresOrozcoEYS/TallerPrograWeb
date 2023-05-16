const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const userController = require('../controllers/users')

router.post('/register', validate(schemas.user), userController.create)
router.post('/login', userController.login)
router.post('/logout', userController.logout);
router.get('/', auth,userController.index)
router.put('/:id',auth, userController.update)
router.delete('/:id',auth, userController.delete)
router.get('/:name',auth, function(req, res){
    res.send('respond with user id: ' + req.params.name)
})


module.exports = router