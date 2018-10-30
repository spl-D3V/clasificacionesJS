const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

let UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        min:4
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.name = function(){
    return this.username;
};

UserSchema.methods.checkPassword = function(password, done){
    let user = this;
    bcrypt.compare(password, user.password, (err, res) =>{
        done(err, res);
    });
}

UserSchema.statics.findByCredentials = function(username, password){
    let user = this;
    return user.findOne({username})
    .then((user) => {
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) =>{
                if(res){
                    resolve(user);
                }else{
                    reject();
                }
            });
        });
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