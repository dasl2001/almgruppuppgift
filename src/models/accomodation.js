const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

// Skapa modellen
const Accomodation = sequelize.define('Accomodation', {
  address:   { type: DataTypes.STRING,  allowNull: false },
  city:      { type: DataTypes.STRING,  allowNull: false },
  country:   { type: DataTypes.STRING,  allowNull: false },
  zipcode:   { type: DataTypes.STRING,  allowNull: false }, // postnummer
  rent:      { type: DataTypes.FLOAT,   allowNull: false }, // hyra
  rooms:     { type: DataTypes.INTEGER, allowNull: false }  // antal rum
});

// User har många boenden, boende tillhör user (userId kopplas automatiskt)
User.hasMany(Accomodation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Accomodation.belongsTo(User);

module.exports = Accomodation;





