const https = require('https');

// Konfigurasi agen HTTPS
const agent = new https.Agent({
  rejectUnauthorized: false
});

module.exports = agent;