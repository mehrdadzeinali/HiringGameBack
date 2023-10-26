// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'Mehrdad',
      password: 'Gorgan59',
      database: 'HiringGame'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'Mehrdad',
      password: 'Gorgan59',
      database: 'HiringGame'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost', // Replace with your production database host
      user: 'Mehrdad', // Replace with your production database username
      password: 'Gorgan59', // Replace with your production database password
      database: 'HiringGame' // Replace with your production database name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
