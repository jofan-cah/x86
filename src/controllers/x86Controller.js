const axios = require('axios');
const createError = require('http-errors');

const https = require('https');


// Fungsi untuk memeriksa status pengguna di X86
const checkIsActiveUserX86 = async (req, res, next) => {
  const idSubs = req.query.name; // Mendapatkan parameter name dari query string

  try {
    const response = await axios.get(`${process.env.X86_HOST}/rest/ppp/active?name=${idSubs}`, {
      auth: {
        username: process.env.X86_USERNAME,
        password: process.env.X86_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error checking pppoe status on X86', error.message);
    next(createError(500, 'Internal Server Error'));
  }
};

// Fungsi untuk menendang (kick) pengguna di X86
const kickUserX86 = async (req, res, next) => {
  const idSubs = req.query.name; // Mendapatkan parameter name dari query string

  try {
    // Langkah 1: Periksa status pengguna di X86
    const response = await axios.get(`${process.env.X86_HOST}/rest/ppp/active?name=${idSubs}`, {
      auth: {
        username: process.env.X86_USERNAME,
        password: process.env.X86_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false // Nonaktifkan verifikasi sertifikat SSL
      }
    });

    if (response.data.length === 0) {
      return res.json({ success: false, message: 'User not found or not active' });
    }

    const idX86 = response.data[0]['.id'];

    // Langkah 2: Lakukan operasi kick
    const kickResponse = await axios.post(`${process.env.X86_HOST}/rest/ppp/active/remove`, {
      ".id": idX86
    }, {
      auth: {
        username: process.env.X86_USERNAME,
        password: process.env.X86_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false // Nonaktifkan verifikasi sertifikat SSL
      }
    });

    if (kickResponse.data === '') {
      return res.json({ success: true, message: 'User kicked successfully' });
    } else {
      return res.json({ success: false, message: 'Failed to kick user' });
    }
  } catch (error) {
    console.error('Error kicking user on X86', error.message);
    next(createError(500, 'Internal Server Error'));
  }
};

const userQueueSimple = async (req, res, next) => {
  const idSubs = req.query.name; // Mendapatkan parameter name dari query string

  try {
    const response = await axios.get(`${process.env.X86_HOST}/rest/ppp/active?name=<pppoe-${idSubs}>`, {
      auth: {
        username: process.env.X86_USERNAME,
        password: process.env.X86_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false // Nonaktifkan verifikasi sertifikat SSL
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error checking pppoe status on X86', error.message);
    next(createError(500, 'Internal Server Error'));
  }
};

module.exports = {
  userQueueSimple,
  checkIsActiveUserX86,
  kickUserX86
};
