const userModel = require('../models/user.model');

module.exports.signUp = async (req, res) => {
    console.log(req.body);

    const { pseudo, email, password } = req.body
    try {
        const user = await userModel.create({ pseudo, email, password });
        console.log("test:" + user);
        res.status(201).json({ user: user._id });
    } catch (err) {
        res.status(200).send({ err });
    }
}