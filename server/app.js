const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();

const studentRoutes = require('./routes/studentRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Register routes
app.use('/api/students', studentRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
