const knex = require('knex');

const dbConfig = {
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'db_admin',
        password: 'QeDaTtFjKazxRrIP',
        database: 'multitenant'
    }
};

const db = knex(dbConfig);

module.exports = db;