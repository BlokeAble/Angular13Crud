module.exports = app => {
    const person = require("../controllers/person.controller.js");
    var router = require("express").Router();
    
    // Create a new Person
    router.post("/", person.create);

    // Retrieve all Person
    router.get("/", person.findAll);
    
    // Update  with id
    router.put("/:id", person.update);

    // Delete  with id
    router.delete("/:id", person.delete);
    
    app.use('/api/person', router);
  };