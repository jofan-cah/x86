const express = require('express');
const router = express.Router();
const { createUserAndProfile, createUserAndProfile, getByName, sysns } = require('../src/controllers/chrController');

// Route untuk memeriksa pengguna berdasarkan nama
router.get('/checkUserByName', createUserAndProfile);
router.get('/createUserAndProfile', createUserAndProfile);
router.get('/getByName', getByName);
router.get('/sysns', sysns);

module.exports = router;
