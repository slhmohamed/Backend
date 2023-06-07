const Client = require('../models/client.modal');
const Log = require('../models/log.model');
exports.newCustomer = async (req, res) => {
    try {
        const existe = await Client.findOne({ email: req.body.email });

        if (existe != null) {
            return res.status(400).send({ message: "Email already exist" });
        }
        const newCustomer = new Client({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            banque: req.body.banque,
            phone: req.body.phone
        })
        let log=new Log({
            user:req.params.id,
            action:"Ajouter nouveau client"
           })
         await  log.save()
        await newCustomer.save();
        return res.status(200).send({ data: newCustomer, message: 'Customer added' })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.getAllCustomer = async (req, res) => {
    const clients = await Client.find();
    res.status(200).send({ data: clients })
}

exports.getSingleCustomer = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.status(200).send({ data: client });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.deleteCustomer = async (req, res) => {
    try {
        await Client.findOneAndRemove({_id:req.params.id});
        let log = new Log({
            user: req.params.idR,
            action: "Supprimé un client"
        })
        await log.save()
        res.status(200).send({ message: "client deleted" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.updateCustomer = async (req, res) => {
    try {
        let updateObj = {}



        updateObj = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            banque: req.body.banque


        }
        let log=new Log({
            user:req.params.idR,
            action:"Modifier client"
           })
         await  log.save()
        const result = await Client.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'Client updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

exports.searchCustomer = async (req, res) => {
    const clients = await Client.find()
        .or([
            { firstName: { $regex: req.params.key, $options: 'i' } },
            { lastName: { $regex: req.params.key, $options: 'i' } },
            { email: { $regex: req.params.key, $options: 'i' } },
            { banque: { $regex: req.params.key, $options: 'i' } }])
    res.status(200).send({ data: clients })
}