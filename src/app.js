const express = require('express');
const cors = require('cors');  // Import the CORS package here
const authRoutes = require('./routes/auth');
const profile = require('./routes/employee')
const routes = require('./routes/index');

const app = express();

app.use(cors());  // Use the CORS middleware here
app.use(express.json());

// Include your routes
app.use('/', routes);
app.use('/api/auth', authRoutes);
app.use('/api/employee', profile)

module.exports = app;
