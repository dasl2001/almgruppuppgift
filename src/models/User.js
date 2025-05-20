const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  profileImage: { type: DataTypes.STRING, validate: { isUrl: true } }
});

module.exports = User;

models/User.js
const mongoose = require('mongoose');
const Accommodation = require('./Accommodation');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // andra fält...
});

// Radera boenden kopplade till användaren innan användaren tas bort
userSchema.pre('remove', async function(next) {
  await Accommodation.deleteMany({ userId: this._id });
  next();
});

module.exports = mongoose.model('User', userSchema);



