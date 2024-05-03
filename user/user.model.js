const mongoose = require("mongoose");


const schemaUser= new mongoose.Schema({
    email:{type:String,required:true, unique:[true,"Este email ya esta en uso"]},
    name:{type:String,required:true},
    password:{type:String,required:true},
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('User', schemaUser);

module.exports = Model;