//const pg = require("pg");
const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bukhara_bus",
  password: "15550107",
  port: 8080,
});
pool.query('SELECT * FROM hudud;', (err, rows, fields) => {
  if(err)
     return console.error("database connected error");
  console.log("database connected.");
  // pool.end() 
})

module.exports =pool;