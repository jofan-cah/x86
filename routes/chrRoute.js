const express = require('express');
const router = express.Router();
const { getUserByName, getUserByNameProfile, createProfile, createUserProfile, updateUser, updateUserProfile, deleteUser, deleteUserProfile, suspendUser, unsuspendUser } = require('../src/controllers/chrController');

// Route untuk memeriksa pengguna berdasarkan nama
router.get('/getUserByName', getUserByName);
router.get('/getUserByNameProfile', getUserByNameProfile);
router.post('/createProfile', createProfile);
router.post('/createUserProfile', createUserProfile);
router.put('/updateUser', updateUser);
router.put('/updateUserProfile', updateUserProfile);
router.delete('/user/:userName', deleteUser);
router.delete('/user-profile/:userProfile', deleteUserProfile);

// Route untuk menyuspend user
router.patch('/user/:userName/suspend', suspendUser);

// Route untuk mengunsuspend user
router.patch('/user/:userName/unsuspend', unsuspendUser);

module.exports = router;
