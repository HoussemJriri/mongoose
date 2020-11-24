const mongoose = require("mongoose");

var personSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "ali" },
  age: { type: Number, required: true, default: 26 },
  favoriteFoods: { type: [String], default: ["makloub"] },
});
module.exports = mongoose.model("Person", personSchema);




