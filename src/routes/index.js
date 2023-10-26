const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, This is Hiring Game!');
});

module.exports = router;
