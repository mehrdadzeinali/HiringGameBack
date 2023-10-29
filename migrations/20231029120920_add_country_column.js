exports.up = function(knex) {
    return knex.schema.table('employee_profiles', function(table) {
      table.string('country'); // Adjust the type as needed
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('employee_profiles', function(table) {
      table.dropColumn('country');
    });
  };
