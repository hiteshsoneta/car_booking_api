const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv/config");
app.use(bodyparser.json());
//import routes
const route = require("./routes/routes");
app.use("/car", verifyToken, route, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
  });
});
//routes
app.get("/", (req, res) => {
  res.send("home page");
});
//connect to db
// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
//   console.log("connected to db!")
// );
app.post("/login", (req, res) => {
  //dummy user
  const user = {
    id: 1,
    username: "hitesh",
  };
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token });
  });
});
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

mongoose.connect("mongodb://localhost/pandas", () =>
  console.log("connected to db!")
);

app.listen(3000);
