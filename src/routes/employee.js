const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
const rimraf = require('rimraf');

cloudinary.config({ 
  cloud_name: 'dteijjl08', 
  api_key: '389839192938178', 
  api_secret: 'Py58yAs5rUiD7ipT04MiChzMT-4' 
});

const employeeModel = require('../models/employee'); // Your employee model

// Route to create a new employee profile
router.post('/create', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'profilePhoto', maxCount: 1 }]), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      category,
      jobTitle,
      experience,
      workType,
      country,
      city,
      situation,
      languages,
    } = req.body;

    // Upload profile photo to Cloudinary
    let profilePhotoURL = null;
    if (req.files && req.files.profilePhoto) {
      const result = await cloudinary.uploader.upload(req.files.profilePhoto[0].path);
      profilePhotoURL = result.secure_url;
    }

    // Upload cv to Cloudinary
    let cvURL = null;
    if (req.files && req.files.cv) {
      const result = await cloudinary.uploader.upload(req.files.cv[0].path, { resource_type: 'raw' });
      cvURL = result.secure_url;
    }
    

    // Create a new employee document
    const newEmployee = {
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      category,
      jobTitle,
      experience,
      workType,
      country,
      city,
      situation,
      languages,
      cv: cvURL,
      profilePhoto: profilePhotoURL,
    };

    await employeeModel.createEmployee(newEmployee);

    rimraf.sync('uploads');

    res.status(201).json({ message: 'Employee profile created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employee = await employeeModel.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
