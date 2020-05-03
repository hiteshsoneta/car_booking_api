const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv/config");
app.use(bodyparser.json());
//import routes
const route = require("./routes/routes");
app.use("/car", route);
//routes
app.get("/", (req, res) => {
  res.send("home page");
});
//connect to db
// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
//   console.log("connected to db!")
// );

mongoose.connect("mongodb://localhost/pandas", () =>
  console.log("connected to db!")
);

app.listen(3000);
