const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const Log = require('../models/log.model');
const saltRounds = 10;
const nodemailer = require('nodemailer');
exports.addUser = async (req, res) => {
    try {
        const existe = await User.findOne({ email: req.body.email });
        if (existe != null) {
          return res.status(400).send({ message: "Email already exist" });
        }
        
        const hashPassword = await bcrypt.hash(req.body.hashed_password, saltRounds);
    
        const newUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          adresse: req.body.adresse,
          hashed_password: hashPassword,
          role:req.body.role,
        phone: req.body.phone,
        type:req.body.type
          
        })
         let log=new Log({
        user:req.params.id,
        action:"Ajouter nouveau client"
       })
     await  log.save()
    await newUser.save();

    const mailOptions = {
        from: 'pfemayssa@gmail.com',
        to: req.body.email,
        subject: `Nouveau responsbale`,
        html: `
                          <h1>Bienvenue parmi nous</h1><hr />
                          
                          <p>Votre email : ${req.body.email} </p><br>
                          <p>Votre mot de passe : ${req.body.hashed_password} </p>
                          <hr />
                          
                          <p>This email may contain sensetive information</p>
                          
                      `
      };

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: 'benammarali776@gmail.com',
            pass: 'tikqaqwcypgyojly'
        }
    });
      let info = await transporter.sendMail(mailOptions);
      if (info) {
        
        return res.json({
          message: `Email has been sent to ${req.body.email}`
        });
      }
      else {
        console.log(err);
        // console.log('SIGNUP EMAIL SENT ERROR', err)
        return res.json({
          message: err.message
        });
  
      }
    
  
       
      } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
      }
}
exports.getAllUser = async (req, res) => {
    const users = await User.find({ _id: { $ne: req.params.id } }).select("-hashed_password")
    res.status(200).send({ data: users })
}

exports.getSingleUser = async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.findById(req.params.id)
        console.log(user);
        res.status(200).send({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        
        const deleteUser = await User.findOneAndRemove({_id:req.params.id});
     
        res.status(200).send({ message: "User deleted" });
        let log = new Log({
            user: req.params.idR,
            action: "Supprimé un utilisateur"
        })
        await log.save()
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.updateUser = async (req, res) => {
    try { 
        let updateObj = {}

        if (req.body.password != null) {
            const hashPaswword = await bcrypt.hash(req.body.password, saltRounds)
            updateObj = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                adresse: req.body.adresse,
                hashed_password: hashPaswword
            }
        } else {
            updateObj = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                adresse: req.body.adresse,

            }
        }
        const result = await User.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'Userd updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

exports.searchUser = async (req, res) => {

    const users = await User.find()
        .or([{ firastName: { $regex: req.params.key, $options: 'i' } }, { lastName: { $regex: req.params.key, $options: 'i' } }, { email: { $regex: req.params.key, $options: 'i' } }])
    res.status(200).send({ data: users })
}