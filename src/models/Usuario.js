const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {Schema} = mongoose;

let UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        minlength:4
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 10
    },
    permissionLevel: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.name = function(){
    return this.username;
};
UserSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['username', 'permissionLevel']);
};

UserSchema.methods.checkPassword = function(password, done){
    let user = this;
    bcrypt.compare(password, user.password, (err, res) =>{
        done(err, res);
    });
}

UserSchema.pre('save', function(next){
    let user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(12,(err, salt) =>{
            bcrypt.hash(user.password, salt, (err, hash) =>{
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

let User = mongoose.model('User', UserSchema);
module.exports = {User};