const express = require('express');
const router = express.Router();
const { createUserAndProfile, suspendOrUnsuspendUser, getByName, sysns } = require('../src/controllers/chrController');

// Route untuk memeriksa pengguna berdasarkan nama
router.get('/createUserAndProfile', createUserAndProfile);
router.get('/suspendOrUnsuspendUser', suspendOrUnsuspendUser);
router.get('/getByName', getByName);
router.get('/sysns', sysns);

module.exports = router;
