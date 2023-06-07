const mongoose = require('mongoose');
// user schema
const logScheama = new mongoose.Schema(
 {
   action: {
     type: String,
    
   },
   user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
 },
 {
   timestamps: true
 }
);



module.exports = mongoose.model('Log', logScheama);
