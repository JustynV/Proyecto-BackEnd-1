const mongoose = require("mongoose");

const schemaOrder = new mongoose.Schema({
    state:{type:String,required:true},
    date:{type:String,required:true},
    creator:{type:String,required:true},
    creator_id:{type:String,required:true},
    items:{type:[String],required:true}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Order', schemaOrder);

module.exports = Model;