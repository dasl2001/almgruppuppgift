/*
Importerar moduler
*/
const { Sequelize } = require('sequelize');

/*
Skapar en ny databasanslutning (Sequelize-instans)
- Använder SQLite som databas
- Lagrar all data i minnet (snabbt & temporärt, passar för tester)
- Stänger av loggning (logging: false)
*/
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

/*
Slår PÅ foreign key constraints
*/
sequelize.authenticate().then(async () => {
  if (sequelize.getDialect() === 'sqlite') {
    await sequelize.query('PRAGMA foreign_keys = ON;');
  }
});

/*
Exporterar 
*/
module.exports = sequelize;


