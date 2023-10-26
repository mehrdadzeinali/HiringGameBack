const express = require('express');
const authRoutes = require('./routes/auth');  // Import auth routes
const routes = require('./routes/index');  // Import other routes

const app = express();  // Create an Express application

app.use(express.json());  // Parse incoming JSON payloads

// Include your routes
app.use('/', routes);  // General routes
app.use('/api/auth', authRoutes);  // Auth routes

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});

module.exports = app;  // Export the app (if needed for other parts like testing)
