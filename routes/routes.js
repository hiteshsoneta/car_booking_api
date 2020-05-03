const express = require("express");
const router = express.Router();
const assert = require("assert");
const Car = require("../models/car");

//gets all cars
router.get("/", async (req, res) => {
  try {
    const car = await Car.find();
    res.json(car);
  } catch (err) {
    res.json({ message: err });
  }
});

//adds a car
router.post("/", async (req, res) => {
  console.log(req.body);
  const car = new Car({
    model: req.body.model,
    vehicle_no: req.body.vehicle_no,
    capacity: req.body.capacity,
    rent: req.body.rent,
  });

  try {
    const savedCar = await car.save();
    res.json(savedCar);
  } catch (err) {
    res.json({ message: err });
  }
});

//specific car
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a car
router.delete("/:id", async (req, res) => {
  try {
    var car = await Car.findById({ _id: req.params.id });
    if (car.reservation.length > 0) {
      res.send("cant delete a reserved car");
    } else {
      var car = await Car.remove({ _id: req.params.id });
      res.json(car);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//update a car
router.patch("/:id", async (req, res) => {
  try {
    const car = await Car.updateOne(
      { _id: req.params.id },
      {
        $set: {
          model: req.body.model,
          vehicle_no: req.body.vehicle_no,
          capacity: req.body.capacity,
          rent: req.body.rent,
        },
      }
    );
    res.json(car);
  } catch (err) {
    res.json({ message: err });
  }
});

//add reservation to a car
router.post("/reserve/:id", async (req, res) => {
  try {
    const car = await Car.findOne({ vehicle_no: req.params.id }).then(function (
      record
    ) {
      record.reservation.push({
        name: req.body.name,
        phone_no: req.body.phone_no,
        booking_date: req.body.booking_date,
        return_date: req.body.return_date,
      });
      for (i = 0; i < record.reservation.length; i++) {
        var a = record.reservation[i].booking_date;
        var b = record.reservation[i].return_date;
        var c = req.body.booking_date;
        var d = req.body.return_date;
        var e = a.toString();
        var f = b.toString();
        console.log(a, b);
        if (e.localeCompare(c) == 1 || f.localeCompare(c) == -1) {
          res.send("cant book in this time period");
          break;
        } else if (
          a.toString().localeCompare(d) == -1 &&
          b.toString().localeCompare(d) == 1
        ) {
          res.send("cant book in this time period");
          break;
        } else {
          record.save();
        }
      }
    });
    res.json(car);
  } catch (err) {
    res.json({ message: err });
  }
});

//status of a car acc to vehicle no
router.get("/status/:id", async (req, res) => {
  var flag = 0;
  const car = await Car.findOne({ vehicle_no: req.params.id });
  for (i = 0; i < car.reservation.length; i++) {
    var a = Date.now();
    var b = car.reservation[i].booking_date;
    var c = car.reservation[i].return_date;

    console.log(a, b, c);
    if (
      b.toString().localeCompare(a) == -1 &&
      c.toString().localeCompare(a) == 1
    ) {
      res.send("Booked Currently");
      flag = 1;
      break;
    }
  }
  if (flag == 0) {
    res.send("available to book");
  }
});

//cars available to book at a given time
router.get("/available", async (req, res) => {
  var car = await Car.find();
  for (i = 0; i < car.length; i++) {
    for (j = 0; j < car.reservation.length; j++) {
      var a = "07/14/20 1:00 AM, EST";
      var b = car.reservation[j].booking_date;
      var c = car.reservation[j].return_date;
      var d = [];
      var flag = 0;
      if (
        b.toString().localeCompare(a) == -1 &&
        c.toString().localeCompare(a) == 1
      ) {
        flag = 1;
      }
    }
    if (flag == 0) {
      d.push(car[i]);
    }
  }
  res.json(d);
});
module.exports = router;
