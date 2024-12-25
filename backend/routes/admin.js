const express = require('express');
const router = express.Router();
const { adminHome } = require('../controllers/adminController');

router.post('/admin', adminHome);

module.exports = router;