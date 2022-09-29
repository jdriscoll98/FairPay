const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const billSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  persons: [personSchema],
});

module.exports = {
  Person: mongoose.model("Person", personSchema),
  Bill: mongoose.model("Bill", billSchema),
};
