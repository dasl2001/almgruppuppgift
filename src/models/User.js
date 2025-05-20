/*
Importerar moduler
DataTypes är ett objekt från Sequelize som innehåller alla datatyper VI kan använda 
sequelize är databasanslutning som vi importerar från en annan fil (../db)
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

/*
Skapar en modell som heter User.
Sequelize skapar en motsvarande tabell i databasen (om inte redan finns).
*/
const User = sequelize.define('User', {

/*
Textsträng 
Måste vara unik (ingen annan användare får ha samma)
Får inte vara tom (allowNull: false)
*/  
  username: { type: DataTypes.STRING, unique: true, allowNull: false },

/*
Textsträng
Måste vara unik
Får inte vara tom
Validering: måste följa e-postformat
*/
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },

/*
Textsträng
Validering: måste vara en giltig URL
*/  
  profileImage: { type: DataTypes.STRING, validate: { isUrl: true } }
});

/*
Gör att du kan använda User-modellen i andra filer
*/
module.exports = User;

