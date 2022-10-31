const express = require('express')
const router = express.Router()
const purchaseController = require('../controllers/purchase')

router.post('/', purchaseController.create)
router.get('/status/:status', purchaseController.getList)
router.get('/last', purchaseController.getLast)
router.get('/:id', purchaseController.getRetrieve)
router.post('/approve', purchaseController.approve)
router.post('/reject', purchaseController.reject)

module.exports = router