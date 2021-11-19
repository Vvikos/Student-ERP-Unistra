const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength:1,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 1,
        select: true,
    },
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        select: true,
    },
    email: {
        type: String,
        required: true,
        minlength:1,
        unique: true,
        trim: true,
    },
    date_birth: {
        type: String,
        required: true,
        default: null,
    },
    student_number: {
        type: Number,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 8,
        select: true,
    },
    picture: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_960_720.png',
    },
    date_subscription: {
        type: Date,
        select: false,
        default: null,
    },
    url_photo: {
        type:String,
        required: false,
    }
});

UserSchema.set('toJSON', {
    virtuals: true
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    let user = this;

    /*if (!user.isModified('password')) {
        return next();
    } else {
    }*/

    bcrypt
        .genSalt(12)
        .then((salt) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });

});

module.exports = mongoose.model('User', UserSchema);
