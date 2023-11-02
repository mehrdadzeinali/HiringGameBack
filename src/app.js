const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profile = require('./routes/employee')
const routes = require('./routes/index');


const app = express();

app.use(cors());
app.use(express.json());

// Include your routes
app.use('/', routes);
app.use('/api/auth', authRoutes);
app.use('/api/employee', profile)

module.exports = app;
