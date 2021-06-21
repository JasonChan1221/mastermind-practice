// Update with your config settings.
import dotenv from 'dotenv';
dotenv.config();

module.exports = {

  development: {
    client: "postgresql",
    connection: {
      user:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      host:process.env.DB_HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test:{
    client: 'postgresql',
    connection:{
      user:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database:process.env.TESTDB_NAME,
      host:process.env.DB_HOST
    },
    pool:{
      min:2,
      max:10
    },
    migratiions:{
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
