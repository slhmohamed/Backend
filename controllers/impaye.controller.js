const Impaye = require('../models/impaye.model');
const Log = require('../models/log.model');

exports.updateStatus = async (req, res) => {
    try { 
        let updateObj = {}

         
            updateObj = {
                status: req.body.status,
            
        
        }
        let log = new Log({
            user: req.params.idR,
            action: "Modifié status de impayé"
        })
        await log.save()
        const result = await Impaye.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'Userd updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

exports.newImpaye = async (req, res) => {
    console.log(req.body);
    try {
        const newImpaye = new Impaye({
            num_compte: req.body.num_compte,
            banque_sndp: req.body.banque_sndp,
            client: req.body.client,
            num_document: req.body.num_document,
            dateEmision: req.body.dateEmision,
            montant: req.body.montant,
            motif: req.body.motif,
            coment: req.body.coment,
            destination: req.body.destination,
            dateArrive: req.body.dateArrive,
            type: req.body.type,

        })
        let log = new Log({
            user: req.params.id,
            action: "Ajouter nouveau impayé"
        })
        await log.save()
        await newImpaye.save();
        return res.status(200).send({ data: newImpaye, message: 'Impaye added' })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.getAllImpaye = async (req, res) => {
    const impayes = await Impaye.find()
        .populate({ path: "client", select: "firstName lastName banque" })
    res.status(200).send({ data: impayes })
}

exports.getSingleImpaye = async (req, res) => {
    try {
        const impaye = await Impaye.findById(req.params.id)
            .populate({ path: "client", select: "firstName lastName banque" })
        res.status(200).send({ data: impaye });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}



exports.getByType = async (req, res) => {
    try {
        const impaye = await Impaye.find({ type: req.params.type })
            .populate({ path: "client", select: "firstName lastName banque" })
        res.status(200).send({ data: impaye });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.getImpayeByClient = async (req, res) => {
    try {
        const impaye = await Impaye.find({ client: req.params.id })
            .populate({ path: "client", select: "firstName lastName banque" })
        res.status(200).send({ data: impaye });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.deleteImpaye = async (req, res) => {
    try {
        await Impaye.findOneAndRemove({_id:req.params.id});
        res.status(200).send({ message: "Impaye deleted" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

exports.updateImpaye = async (req, res) => {
    try {
        let updateObj = {}
        updateObj = {
            num_compte: req.body.num_compte,
            banque_sndp: req.body.banque_sndp,
            client: req.body.client,
            num_document: req.body.num_document,
            dateEmision: req.body.dateEmision,
            montant: req.body.montant,
            motif: req.body.motif,
            coment: req.body.coment,
            destination: req.body.destination,
            dateArrive: req.body.dateArrive,
            type: req.body.type,
            status: req.body.status


        }
        const result = await Impaye.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'Impaye updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.searchImpaye = async (req, res) => {

    const impayes = await Impaye.find().populate({ path: "client", select: "firstName lastName banque" })
        .or([{ num_compte: { $regex: req.params.num_compte, $options: 'i' } }, { status: { $regex: req.params.status, $options: 'i' } }])
    res.status(200).send({ data: impayes })
}