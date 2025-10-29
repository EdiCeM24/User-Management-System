const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController');



router.get('/', customerController.homepage)
router.get('/add', customerController.addCustomer)
router.get('/view/:id', customerController.viewCustomer)
router.get('/edit/:id', customerController.editCustomer)
router.get('/about', customerController.about)
router.get('/page-not-found', customerController.pageNotFound)
router.get('/blog', customerController.blog)
router.get('/contact', customerController.contact)
router.get('/settings', customerController.settings)
router.get('/register', customerController.register)
router.get('/login', customerController.login)


router.post('/register', customerController.registerPost)
router.post('/login', customerController.loginPost)
router.post('/logout', customerController.logout)
router.post('/search', customerController.searchCustomer)
router.delete('/edit/:id', customerController.deleteCustomer)
router.post('/add', customerController.postCustomer)
router.put('/edit/:id', customerController.editPost)



module.exports = router;