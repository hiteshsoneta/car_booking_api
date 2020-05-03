const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  vehicle_no: {
    type: String,
    required: true,
  },
  booking_date: {
    type: Date,
    required: true,
  },
  booking_time: {
    type: Timestamp,
    required: true,
  },
  return_date: {
    type: Date,
    required: true,
  },
  return_time: {
    type: Timestamp,
    required: true,
  },
});

module.exports = mongoose.model("reservation", reservationSchema);
