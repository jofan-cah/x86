require('dotenv').config(); // Memuat konfigurasi dari file .env
const express = require('express');
const axios = require('axios');
const { createError } = require('http-errors');

const app = express();
const port = process.env.PORT;

// Mengimpor routes
const x86Routes = require('./routes/x86Routes');

// Menggunakan routes
app.use('/api', x86Routes);


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
