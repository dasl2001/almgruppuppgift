/*
user.js
Importerar moduler
DataTypes är ett objekt från Sequelize som innehåller alla datatyper VI kan använda 
sequelize är databasanslutning som vi importerar från en annan fil (../db)
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/*
Skapar en modell som heter User.
Sequelize skapar en motsvarande tabell i databasen (om inte redan finns).
*/
const User = sequelize.define('User', {
 
/*
Definierar ett fält för användarnamn i modellen
*/  
username: { 
  type: DataTypes.STRING, 
  allowNull: false, 
  unique: { name: 'unique_username', msg: 'Användarnamn måste vara unikt' }
},

/*
Definierar ett fält för e-postadress i modellen
*/
email: { 
  type: DataTypes.STRING, 
  allowNull: false, 
  unique: { name: 'unique_email', msg: 'E-post måste vara unik' },
  validate: { isEmail: true }
},

/*
Textsträng
Validering: måste vara en giltig URL
*/
  profileImage: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } }
});

/*
Gör att du kan använda User-modellen i andra filer
*/
module.exports = User;

