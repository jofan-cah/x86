require('dotenv').config(); // Memuat konfigurasi dari file .env
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const Subscription = require('./models/subscriptionsModel')
const maxnetDB = require('./config/db');


// Mengimpor routes
const x86Routes = require('./routes/x86Route');
const chrRoutes = require('./routes/chrRoute');
app.use(cors());
app.use(express.json());

app.use('/api/x86', x86Routes);
app.use('/api/chr', chrRoutes);


// Root route
app.get('/', async (req, res) => {

  res.send('HALLO WORLD')
});

maxnetDB.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
