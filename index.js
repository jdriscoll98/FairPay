const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

const routes = require("./routes/routes");

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
