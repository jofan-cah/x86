const express = require('express');
const router = express.Router();
const { checkIsActiveUserX86 } = require('../controllers/x86Controller');

// Route untuk memeriksa status pengguna di X86
router.get('/isActiveUserX86', checkIsActiveUserX86);

module.exports = router;
