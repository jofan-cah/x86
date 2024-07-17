require('dotenv').config(); // Memuat konfigurasi dari file .env
const express = require('express');
const axios = require('axios');
const { createError } = require('http-errors');

const app = express();
const port = process.env.PORT;


// Endpoint untuk memeriksa status pengguna di X86
// Endpoint untuk memeriksa status pengguna di X86
app.get('/api/isActiveUserX86', (req, res, next) => {
  const idSubs = req.query.name; // Mendapatkan parameter name dari query string

  axios.get(`${process.env.X86_HOST}/rest/ppp/active?name=${idSubs}`, {
    auth: {
      username: process.env.X86_USERNAME,
      password: process.env.X86_PASSWORD
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      // Tangani error dengan melempar error HTTP atau logging ke sistem monitoring
      console.error('Error checking pppoe status on X86', error.message);

    });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
