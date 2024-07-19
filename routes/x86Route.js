const express = require('express');
const router = express.Router();
const { checkIsActiveUserX86, kickUserX86, userQueueSimple } = require('../src/controllers/x86Controller');

// Route untuk memeriksa status pengguna di X86
router.get('/isActiveUserX86', checkIsActiveUserX86);
router.post('/kickUserX86', kickUserX86);
router.get('/userQueueSimple', userQueueSimple);

module.exports = router;
