const axios = require('axios');
const createError = require('http-errors');

const https = require('https');

const agent = require('../../helpers/http');

// Fungsi untuk memeriksa status pengguna di X86
const checkIsActiveUserX86 = async (req, res, next) => {
  const idSubs = req.query.name; // Mendapatkan parameter name dari query string


  try {
    const response = await axios.get(`${process.env.X86_HOST}/rest/ppp/active?name=${idSubs}`, {
      auth: {
        username: process.env.X86_USERNAME,
        password: process.env.X86_PASSWORD
      },

      httpsAgent: agent
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error checking pppoe status on X86', error.message);
    next(createError(500, 'Internal Server Error'));
  }
};

// Fungsi untuk menendang (kick) pengguna di X86
const kickUserX86 = async (req, res) => {
  const idx86 = req.body['.id'];

  try {
    console.log(idx86)

    // Langkah 2: Lakukan operasi kick
    const kickResponse = await axios.post(`${process.env.X86_HOST}/rest/ppp/active/remove`, {
      ".id": idx86
    }, {
      auth: {
        username: process.env.X86_USERNAME,
        password: process.env.X86_PASSWORD
      },
      httpsAgent: agent
    });

    console.log(kickResponse)
    return res.json({ success: true, message: 'User kicked successfully' });

  } catch (error) {
    console.error('Error kicking user on X86', error.message);

  }
};

const userQueueSimple = async (req, res, next) => {
  const idSubs = req.query.name;
  console.log(idSubs)

  try {
    const response = await axios.get(`${process.env.X86_HOST}/rest/queue/simple?name=<pppoe-${idSubs}>`, {
      auth: {
        username: process.env.X86_USERNAME,
        password: process.env.X86_PASSWORD
      },
      httpsAgent: agent
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
