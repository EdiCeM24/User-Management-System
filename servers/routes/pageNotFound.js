const express = require('express')
const router = express.Router()
const pageNotFound = require('../controllers/PageNotFound');


router.get('*', pageNotFound.pageNotFound)




module.exports = router;