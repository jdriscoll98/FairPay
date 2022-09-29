const express = require("express");

const router = express.Router();

const { Person, Bill } = require("../model/model");

router.post("/bills", async (req, res) => {
  // generate a unique id for the bill
  const id = Math.random().toString().substring(2, 8);
  const { amount } = req.body;
  const data = new Bill({
    amount,
    id,
  });
  try {
    data.save();
    res.json({
      id,
    });
  } catch {
    res.json({
      error: "Error Occured",
    });
  }
});

router.get("/bills/:id", (req, res) => {
  try {
    Bill.findOne({ id: req.params.id }, (err, data) => {
      if (err) {
        res.json({
          error: "Error Occured",
        });
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    res.json({
      error: "Error Occured",
    });
  }
});

router.patch("/bills/:id", (req, res) => {
  try {
    Bill.findOne({ id: req.params.id }, (err, data) => {
      if (err) {
        res.json({
          error: "Error Occured",
        });
      } else {
        // create a new person
        const person = new Person({
          name: req.body.name,
          salary: req.body.salary,
        });
        // save the person
        person.save();
        // add the person to the bill
        data.persons.push(person);
        // save the bill
        data.save();
        res.json(data.persons);
      }
    });
  } catch (error) {
    res.json({
      error: "Error Occured",
    });
  }
});
module.exports = router;
