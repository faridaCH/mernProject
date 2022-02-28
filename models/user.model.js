const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
//const [isEmail]=mongoose.isEmail;
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true  // annuler les espaces 
        },
        email: {
            type: String,
            required: true,
            // validate: mongoose.isValidObjectId,
            validate: [isEmail],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            max: 1024,
            trim: true
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"

        },
        bio: {
            type: String,
            max: 1024,
        },
        folowers: {
            type: [String]
        },
        folowing: {
            type: [String]
        },
        likes: {
            type: [String]
        }

    },
    {
        timestamps: true,
    }
);

// play function before save into display: 'block', 
// cryptage de mot de passe 
userSchema.pre("save", async function(next){
    const salt= await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;