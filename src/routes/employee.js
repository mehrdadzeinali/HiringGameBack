const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define where uploaded files will be stored

const employeeModel = require('../models/employeeSchema'); // Your employee model

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

    // Check if email is already registered
    // const existingEmployee = await employeeModel.getEmployeeByEmail(email);
    // if (existingEmployee) {
    //   return res.status(400).json({ error: 'Email already registered' });
    // }

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
      cv: req.files?.cv ? req.files.cv[0].path : null, // Updated this line
      profilePhoto: req.files?.profilePhoto ? req.files.profilePhoto[0].path : null, // And this one
    };

    // Save the employee document to the database
    await employeeModel.createEmployee(newEmployee);

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
