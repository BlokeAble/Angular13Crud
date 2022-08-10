module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          personName: String,
          age: Number,
          birthday: String,
          phoneNumber : String,
          bankAccount : Number
        },
        { timestamps: true }
      
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
      const Person = mongoose.model("person", schema);
      return Person;
  };