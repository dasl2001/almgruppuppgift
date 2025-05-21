/*
Importera datatyper från Sequelize
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

/*
Definierar modellen Accomodation
*/
const Accomodation = sequelize.define('Accomodation', {
  address:   { type: DataTypes.STRING,  allowNull: false },
  city:      { type: DataTypes.STRING,  allowNull: false },
  country:   { type: DataTypes.STRING,  allowNull: false },
  zipcode:   { type: DataTypes.STRING,  allowNull: false },
  rent:      { 
    type: DataTypes.FLOAT,   
    allowNull: false,
    validate: { isFloat: true }
  },
  rooms:     { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: { isInt: true }
  }
});


/*
Skapa relationen så att CASCADE fungerar
*/
User.hasMany(Accomodation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Accomodation.belongsTo(User, { foreignKey: { allowNull: false } });

module.exports = Accomodation;






