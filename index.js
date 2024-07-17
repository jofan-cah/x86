require('dotenv').config(); // Memuat konfigurasi dari file .env
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors'); 

// Mengimpor routes
const x86Routes = require('./routes/x86Route');
const chrRoutes = require('./routes/chrRoute');
app.use(cors());

app.use('/api/x86', x86Routes);
app.use('/api/chr', chrRoutes);




app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
