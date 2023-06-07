require("dotenv").config();
    
 
const  connection = require("../config/db"); 
const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

 
let seedAdmin = async () => {
      let admins = await User.find();
      console.log(admins.length);
      if(admins.length > 0){
         console.log("Admin user exist");
      } else {
        try{
            const hashPaswword = await bcrypt.hash('admin', saltRounds)
           let admin = new User({firstName:'admin',lastName:'admin',phone:'98765432',email: 'admin@gmail.com',role:"Admin", hashed_password :hashPaswword })
            
            await admin.save()
           console.log("Admin user added sucessfuly !");
        }catch(error){
          console.log("error : ", error);
        }
   }

  }

  let seed = async() => {
      await connection();
       
      await seedAdmin();
 
      process.exit(1);
  }

  seed();