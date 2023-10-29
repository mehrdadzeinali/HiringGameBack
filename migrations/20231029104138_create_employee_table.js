exports.up = function (knex) {
    return knex.schema.createTable('employee_profiles', function (table) {
      table.increments('id').primary();
      table.string('firstName');
      table.string('lastName');
      table.string('email');
      table.string('phone');
      table.string('linkedin');
      table.string('category');
      table.string('jobTitle');
      table.string('experience');
      table.string('workType');
      table.string('city');
      table.string('situation');
      table.string('languages');
      table.string('cv'); // Store the path to the CV file
      table.string('profilePhoto'); // Store the path to the profile photo file
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('employee_profiles');
  };
  