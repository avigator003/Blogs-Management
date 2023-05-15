const router = require('express').Router()
const controller = require('./blog.controller')

router.post('/update/:id', controller.update)
router.post('/list', controller.showAll)
router.get('/delete/:id', controller.delete)
router.post('/create', controller.create)
router.get('/view/:id', controller.view)

module.exports = router
