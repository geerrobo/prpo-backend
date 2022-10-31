const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')

router.post('/', projectController.create)
router.get('/', projectController.getList)
router.get('/:id', projectController.getRetrieve)

module.exports = router