const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const sedeController = require('../controllers/sedes')

router.post('/create', auth, sedeController.create)
router.put('/:id', auth, sedeController.update)
router.get('/', auth, sedeController.index)
router.get('/:id', auth, sedeController.show)
router.delete('/:id', auth, sedeController.delete)
router.delete('/:id/users/:userId', auth, sedeController.removeOwner);

module.exports = router