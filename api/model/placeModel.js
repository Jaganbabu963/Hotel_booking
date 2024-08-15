const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId },

  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Date,
  checkOut: Date,
  maxGuests: Number,
  price: Number,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
