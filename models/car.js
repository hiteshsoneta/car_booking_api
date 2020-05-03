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
  booking_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  return_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const carSchema = mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  vehicle_no: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  rent: {
    type: Number,
    required: true,
  },
  reservation: [reservationSchema],
});

module.exports = mongoose.model("car", carSchema);
