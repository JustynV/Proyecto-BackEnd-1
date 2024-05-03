const mongoose = require("mongoose");

const schemaBook = new mongoose.Schema({
    genre:{type:String,required:true},
    publish_date:{type:String,required:true},
    publisher:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    author_id:{type:String, required:true}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Book', schemaBook);

module.exports = Model;