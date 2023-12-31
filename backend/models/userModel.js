const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
    }
});


// static signup method
userSchema.statics.signup = async function(email, password){

    if(!email || !password){
        throw Error('All Fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter a valid e-mail');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({ email });
    if(exists){
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});

    return user;

}

// static login method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All Fields must be filled');
    }

    const user = await this.findOne({ email });
    if(!user){
        throw Error('not a user');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);