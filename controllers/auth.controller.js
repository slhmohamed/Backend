const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

exports.newResponsable = async (req, res) => {

  try {
    const existe = await User.findOne({ email: req.body.email });

    if (existe != null) {
      return res.status(400).send({ message: "Email already exist" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      adresse: req.body.adresse,
      hashed_password: hashPassword,
      
      dateNaissance: req.body.date
    })
    console.log(newUser);
    await newUser.save();
    return res.status(200).send({ data: newUser, message: 'User added' })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ errors: error })
  }
}
exports.signin = async (req, res) => {
  //check if user exist with email send for user 
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send({ errors: "Utilisateur introuvable avec cet email. veuillez réessayer" })
  }
console.log(user);
  const compare = await bcrypt.compare(req.body.password, user.hashed_password)
  //compare password user and password send for user 
  if (!compare) {
    return res.status(400).json({
      errors: 'Email ou le mot de passe ne correspondent pas'
    });
  }
  // generate a token and send to client
  const token = jwt.sign({
    _id: user._id, email: user.email
  },
    process.env.secretOrPrivateKey,
    {
      expiresIn: '7d'
    }
  )

  return res.status(200).send({ token: token, id: user._id,role:user.role })
}


//exports.requireSignin = expressJwt({
  //secret: process.env.JWT_SECRET // req.user._id
//});

