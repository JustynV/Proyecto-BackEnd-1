const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  deleted: { type: Boolean, default:false, required: true},
});

const Model = mongoose.model("User", schemaUser);

module.exports = Model;
