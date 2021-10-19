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
        select: false,
    },
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        select: false,
    },
    email: {
        type: String,
        required: true,
        minlength:1,
        unique: true,
        trim: true,
    },
    date_birth: {
        type: Date,
        required: true,
        default: null,
    },
    student_number: {
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 8,
        select: false,
    },
    picture: {
        type: String,
        select: false,
    },
    date_subscription: {
        type: String,
        select: false,
        default: null,
    },
});

UserSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'likee',
    count: true,
});

UserSchema.virtual('liked', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'likee',
    count: true,
});

UserSchema.set('toJSON', {
    virtuals: true
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    } else {
    }

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
