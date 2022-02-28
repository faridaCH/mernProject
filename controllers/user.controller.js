
const userModel = require('../models/user.model');
const objectUserId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    // const users=await userModel.find().select(); // transit de mot de passe 
    const users = await userModel.find().select('-password'); // le transite se fait sans le transfert de mot de passe
    res.status(200).json(users);
}

module.exports.getUser = async (req, res) => {
    console.log(req.params);
    if (!objectUserId.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id)
    }

    userModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log("id Unknown : " + err);
        }
    }).select('-password');

}


// revoir la methode et comprendre d'ou vien le message d'erreur  sur postman
module.exports.updateUser = async (req, res) => {
    if (!objectUserId.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
         await userModel.findOneAndUpdate(
            { _id: req.params.id },

            { // les données à mettre à jour
                $set: {
                    bio: req.body.bio
                }
            },
            { //la config a faire pour un put
                new: true, upsert: true, setDefaultsOnInsert: true
            },
            (err, docs) => {
                if (err) return res.status(500).send({ message: err });
                 if (!err) return res.send(docs);
             }
             )
             console.log(' je suis dans le try')
        } catch (err) {
         console.log('je suis dans le catsh');
        return res.status(500).json({ message: err });
    }
}