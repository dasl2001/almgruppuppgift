/*
Importerar moduler
*/
const { Sequelize } = require('sequelize');

/*
Skapar en ny databasanslutning (Sequelize-instans)
Använder vi SQLite som databas
*/
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false
});

/*
Exporterar 
*/
module.exports = sequelize;

