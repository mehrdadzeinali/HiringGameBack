const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Files will be stored in memory as buffer
const cloudinary = require('cloudinary').v2;
const employeeModel = require('../models/employee'); // Your employee model

cloudinary.config({ 
  cloud_name: 'dteijjl08', 
  api_key: '389839192938178', 
  api_secret: 'Py58yAs5rUiD7ipT04MiChzMT-4' 
});

router.post('/create', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'profilePhoto', maxCount: 1 }]), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, linkedin, category, jobTitle, experience, workType, country, city, situation, languages } = req.body;

    let profilePhotoURL = null;
    let cvURL = null;
    
    if (req.files && req.files.profilePhoto) {
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            profilePhotoURL = result.secure_url;
            resolve();
          }
        });
        const readableStream = require('stream').Readable.from(req.files.profilePhoto[0].buffer);
        readableStream.pipe(uploadStream);
      });
    }

    if (req.files && req.files.cv) {router.get('/list', async (req, res) => {
      console.log('mehrdad');
      try {
        // Extract query parameters
        const {
          category,
          jobTitle,
          experience,
          workType,
          country,
          city,
          situation,
          languages
        } = req.query;
    
        const filter = {};
        if (category) filter.category = category;
        if (jobTitle) filter.jobTitle = jobTitle;
        if (experience) filter.experience = experience;
        if (workType) filter.workType = workType;
        if (country) filter.country = country;
        if (city) filter.city = city;
        if (situation) filter.situation = situation;
        if (languages) filter.languages = languages.split(',');
    
        const employees = await employeeModel.getFilteredEmployees(filter);
    
        console.log(employees);
    
        if (!employees || employees.length === 0) {
          return res.status(404).json({ error: 'No employees found !!!!' });
        }
        res.status(200).json(employees);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            cvURL = result.secure_url;
            resolve();
          }
        });
        const readableStream = require('stream').Readable.from(req.files.cv[0].buffer);
        readableStream.pipe(uploadStream);
      });
    }
    
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

    const employeeInfo = await employeeModel.createEmployee(newEmployee);
    
    res.status(201).json({ message: 'Employee profile created successfully', id: employeeInfo.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const {
      category,
      jobTitle,
      experience,
      workType,
      country,
      city,
      situation,
      languages
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (jobTitle) filter.jobTitle = jobTitle;
    if (experience) filter.experience = experience;
    if (workType) filter.workType = workType;
    if (country) filter.country = country;
    if (city) filter.city = city;
    if (situation) filter.situation = situation;
    if (languages) filter.languages = languages.split(',');

    const employees = await employeeModel.getFilteredEmployees(filter);

    if (!employees || employees.length === 0) {
      return res.status(404).json({ error: 'No employees found !!!!' });
    }
    res.status(200).json(employees);
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
