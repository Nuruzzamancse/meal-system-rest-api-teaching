var express = require('express'),
    router = express.Router(),
    authController = require('../controllers/auth');

router.post('/login', authController.userLogin);

module.exports = router;