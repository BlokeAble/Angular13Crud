const db = require("../models");
const Person = db.person;
// Create and Save a new Person
exports.create = (req, res) => {
   // Validate request
  if (!req.body.personName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Person
  const person = new Person({
    personName: req.body.personName,
    age: req.body.age,
    birthday: req.body.birthday,
    phoneNumber: req.body.phoneNumber,
    bankAccount: req.body.bankAccount
  });
  // Save Person in the database
    person
    .save(person)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    });
};

// Retrieve all Persons from the database.
exports.findAll = (req, res) => {
    const personName = req.query.personName;
    var condition = personName ? { personName: { $regex: new RegExp(personName), $options: "i" } } : {};
    Person.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Persons."
        });
      });
};
// Update a Person by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Person with id=${id}. Maybe Person was not found!`
          });
        } else res.send({ message: "Person was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Person with id=" + id
        });
      });
  };

// Delete a Person with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
          });
        } else {
          res.send({
            message: "Person was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Person with id=" + id
        });
      });
  };
