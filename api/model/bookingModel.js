const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.ObjectId, required: true, ref: 'Place' },
  user: { type: mongoose.Schema.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  price: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
