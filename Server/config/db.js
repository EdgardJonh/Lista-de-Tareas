const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.PG_USER, // user name
    host: process.env.PG_HOST, // database host
    port: process.env.PG_PORT, // database port
    database: process.env.PG_DATABASE,   // database name    
    password: process.env.PG_PASSWORD,   // password
});

module.exports = pool;