const mongoose = require('mongoose');
// user schema
const impayeScheama = new mongoose.Schema(
  {
    num_compte: {
      type: String,
      unique: true,
      required: true,
       
    },
    banque_sndp: {
      type: String,
      required: true
    },
      
  client:{type: mongoose.Schema.Types.ObjectId, ref: "Client"},
    num_document: {
      type: String,
      unique:true,
      required: true
    },
    dateEmision:{
      type:String,
      required:true
    },
    montant:{
      type:Number,
      required:true
    }
    ,
    motif:{
      type:String,
      enum:['sans provision','Signature non conforme','Falsifié','Emis au-delà de la date limitée','']
       
    },
    coment:{
        type:String
    },
    destination:{
        type:String,
        enum:['DVD','GAZ','RESEAU']
    },
    envoie:{
      type:String,
       
  },
    dateArrive:{
        type:Date,

    }
    ,type:{
        type:String, 
        enum:['Chéque','Effet']
      }
    ,
    status:{
        type:String,
        enum:['En attente','En cours','Cloture','Refuse'],
        default:'En attente'
      }
  },
  {
    timestamps: true 
  }
);
 
 

module.exports = mongoose.model('Impaye', impayeScheama);
