const mongoose = require('mongoose');
 // user schema
const clientScheama = new mongoose.Schema(
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
    },
    banque:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true
  }
);
 
 

module.exports = mongoose.model('Client', clientScheama);
