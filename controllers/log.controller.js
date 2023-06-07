const Client = require('../models/client.modal');
 
const Log = require('../models/log.model');

exports.getLogByUser= async (req, res) => {
    try {
        const logs = await Log.find({user:req.params.id});
        res.status(200).send({ data: logs });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
} 