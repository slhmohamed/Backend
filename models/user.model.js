const mongoose = require('mongoose');
 // user schema
const userScheama = new mongoose.Schema(
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
    },
    type: {
      type: String 
    },
         
    role:{
      type:String,
      enum:['Financier','Commerciaux','Précontentieux','Admin']
    } 
  },
  {
    timestamps: true
  }
);
 
module.exports = mongoose.model('User', userScheama);
