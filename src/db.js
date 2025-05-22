/*
Importerar moduler
*/
require('dotenv').config();
const { Sequelize } = require('sequelize');

/*
Skapar en ny anslutning till databasen med hjälp av Sequelize
Hämtar inställningar (databasnamn, användare, lösenord, host) från miljövariabler
Om någon variabel saknas används 'postgres' och 'localhost' som standardvärden
*/
const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;



