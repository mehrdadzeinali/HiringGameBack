const db = require('../config/db');

module.exports = {
  async createEmployee(employeeObject) {
    const { firstName, lastName, email, phone, linkedin, category, jobTitle, experience, workType, country, city, situation, languages, cv, profilePhoto } = employeeObject;
  
    const sql = `
      INSERT INTO employee_profiles 
      (firstName, lastName, email, phone, linkedin, category, jobTitle, experience, workType, country, city, situation, languages, cv, profilePhoto) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const params = [
      firstName, lastName, email, 
      phone, linkedin, category, 
      jobTitle, experience, workType,
      country, city, situation, 
      languages, cv, profilePhoto
    ];
  
    const [result] = await db.query(sql, params);
  
    return result;
  },

  async getEmployeeByEmail(email) {
    const sql = 'SELECT * FROM employee_profiles WHERE email = ?';

    const [rows] = await db.query(sql, [email]);

    return rows[0];
  },

  async getEmployeeById(id) {
    const sql = 'SELECT * FROM employee_profiles WHERE id = ?';

    const [rows] = await db.query(sql, [id]);

    return rows[0];
  },

  async getFilteredEmployees(filter) {
    let sql = 'SELECT * FROM employee_profiles WHERE 1=1';
    const params = [];

    if (filter.category) {
      sql += ' AND category = ?';
      params.push(filter.category);
    }

    if (filter.jobTitle) {
      sql += ' AND jobTitle = ?';
      params.push(filter.jobTitle);
    }

    if (filter.experience) {
      sql += ' AND experience = ?';
      params.push(filter.experience);
    }

    if (filter.workType) {
      sql += ' AND workType = ?';
      params.push(filter.workType);
    }

    if (filter.country) {
      sql += ' AND country = ?';
      params.push(filter.country);
    }

    if (filter.city) {
      sql += ' AND city = ?';
      params.push(filter.city);
    }

    if (filter.situation) {
      sql += ' AND situation = ?';
      params.push(filter.situation);
    }

    if (filter.languages) {
      const languageCriteria = filter.languages.map(lang => '?').join(',');
      sql += ` AND languages IN (${languageCriteria})`;
      params.push(...filter.languages);
    }

    console.log('mehrdad')
    console.log(sql);

    const [rows] = await db.query(sql, params);

    console.log(rows);

    return rows;
  }
};
