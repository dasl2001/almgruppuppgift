const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city:    { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  rent:    { type: Number, required: true },
  rooms:   { type: Number, required: true },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Accommodation', accommodationSchema);
