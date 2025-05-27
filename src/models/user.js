const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = sequelize.define('User', {
username: { 
  type: DataTypes.STRING, 
  allowNull: false, 
  unique: { name: 'unique_username', msg: 'Användarnamn måste vara unikt' }
},
email: { 
  type: DataTypes.STRING, 
  allowNull: false, 
  unique: { name: 'unique_email', msg: 'E-post måste vara unik' },
  validate: { isEmail: true }
},
  profileImage: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } }
});
module.exports = User;

