const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dteijjl08', 
  api_key: '389839192938178', 
  api_secret: 'Py58yAs5rUiD7ipT04MiChzMT-4' 
});

module.exports = cloudinary;
