const db = require('../config/db');

module.exports = {
  // Create a new employee
  async createEmployee(employeeObject) {
    // Destructure properties from the employeeObject
    const { firstName, lastName, email, phone, linkedin, category, jobTitle, experience, workType, country, city, situation, languages, cv, profilePhoto } = employeeObject;
  
    // SQL query string
    const sql = `
      INSERT INTO employee_profiles 
      (firstName, lastName, email, phone, linkedin, category, jobTitle, experience, workType, country, city, situation, languages, cv, profilePhoto) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    // Parameters for SQL query
    const params = [
      firstName, lastName, email, 
      phone, linkedin, category, 
      jobTitle, experience, workType,
      country, city, situation, 
      languages, cv, profilePhoto
    ];
  
    // Execute the query
    const [result] = await db.query(sql, params);
  
    // Return the result
    return result;
  },

  // Get an employee by email
  async getEmployeeByEmail(email) {
    // SQL query string
    const sql = 'SELECT * FROM employee_profiles WHERE email = ?';

    // Execute the query
    const [rows] = await db.query(sql, [email]);

    // Return the result
    return rows[0];
  },

  async getEmployeeById(id) {
    const sql = 'SELECT * FROM employee_profiles WHERE id = ?';

    const [rows] = await db.query(sql, [id]);

    return rows[0];
  },

};
