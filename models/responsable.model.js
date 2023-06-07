const mongoose = require('mongoose');
const crypto = require('crypto');
// user schema
const responsableSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
       lowercase: true
    },
    firstName: {
      type: String,
      required: true
    },
 
    lastName: {
      type: String,
      required: true
    },
      
    phone: {
      type: String,
      required: true
    } ,
    hashed_password: {
      type: String,
      required: true
    } ,
    role:{
        type:String,
        required:true
      }
  },
 
  {
    timestamps: true
  }
);
 
 

module.exports = mongoose.model('Responsable', responsableSchema);
