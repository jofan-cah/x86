const express = require('express');
const router = express.Router();

const { syncIp } = require('../src/controllers/sysIp');
const { sysService } = require('../src/controllers/sysService');
const { sysSuspend } = require('../src/controllers/sysSuspend');

router.get('/syncIp', syncIp);
router.get('/sysService', sysService);
router.get('/sysSuspend', sysSuspend);

module.exports = router;