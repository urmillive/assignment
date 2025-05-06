const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
const pool = require('./utils/db');
const studentRoutes = require('./routes/studentRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

app.use(express.json());
app.use(morgan('dev'));

// Register routes
app.use('/api/students', studentRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
