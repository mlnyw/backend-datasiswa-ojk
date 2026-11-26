require('dotenv').config(); // load .env
const express = require('express');
const cors = require('cors');
const app = express();

// routes
const siswaRoutes = require('./routes/siswaRoutes');

// middleware global
app.use(cors()); // aktifkan CORS
app.use(express.json()); // parse JSON body

// mount routes
app.use('/api/siswa', siswaRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});