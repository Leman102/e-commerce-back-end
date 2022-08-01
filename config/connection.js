require('dotenv').config();

const Sequelize = require('sequelize');

let sequelize;

//Create connection to database, pass in MySQL information for username and password
//this if will use either heroku=>addOn or local host
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}


module.exports = sequelize;

