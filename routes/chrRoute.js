const express = require('express');
const router = express.Router();
const { getUserByName, getUserByNameProfile, createProfile, createUserProfile, updateUser, updateUserProfile, deleteUser, deleteUserProfile, suspendUser, unsuspendUser } = require('../src/controllers/chrController');

// Route untuk memeriksa pengguna berdasarkan nama
router.get('/getUserByName', getUserByName);
router.get('/getUserByNameProfile', getUserByNameProfile);
router.post('/createProfile', createProfile);
router.post('/createUserProfile', createUserProfile);
router.patch('/updateUser', updateUser);
router.patch('/updateUserProfile', updateUserProfile);
router.delete('/user/:userName', deleteUser);
router.delete('/deleteUserProfile/:userProfile', deleteUserProfile);

// Route untuk menyuspend user
router.patch('/suspendUser/:userName', suspendUser);

// Route untuk mengunsuspend user
router.patch('/unsuspendUser/:userName', unsuspendUser);

module.exports = router;
