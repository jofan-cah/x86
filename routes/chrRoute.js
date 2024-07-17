const express = require('express');
const router = express.Router();
const { checkUserByName, createUserAndProfile, getByName, sysns } = require('../src/controllers/chrController');

// Route untuk memeriksa pengguna berdasarkan nama
router.get('/checkUserByName', checkUserByName);
router.post('/createUserAndProfile', createUserAndProfile);
router.post('/getByName', getByName);
router.post('/sysns', sysns);

module.exports = router;
