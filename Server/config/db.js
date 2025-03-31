const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',   // database name    
    password: 'password',   // password
    port: 5432,
});

module.exports = pool;