const app = require('./app'); // Import the app object from app.js

const port = 3000; // Define the port number

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
