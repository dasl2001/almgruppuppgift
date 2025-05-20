const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

// Skapa modellen
const Accomodation = sequelize.define('Accomodation', {
  address:   { type: DataTypes.STRING,  allowNull: false },
  city:      { type: DataTypes.STRING,  allowNull: false },
  country:   { type: DataTypes.STRING,  allowNull: false },
  zipcode:   { type: DataTypes.STRING,  allowNull: false },
  rent:      { type: DataTypes.FLOAT,   allowNull: false },
  rooms:     { type: DataTypes.INTEGER, allowNull: false }
});

// Rätt sätt att skapa relationer
User.hasMany(Accomodation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Accomodation.belongsTo(User);

module.exports = Accomodation;





