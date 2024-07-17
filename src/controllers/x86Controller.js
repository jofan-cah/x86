const axios = require('axios');
const createError = require('http-errors');



const checkIsActiveUserX86 = async (req, res, next) => {
  const idSubs = req.query.name; 

  try {
    const response = await axios.get(`${process.env.X86_HOST}/rest/ppp/active?name=${idSubs}`, {
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
  checkIsActiveUserX86
};
