var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'some other secret as default';
const passport = require('passport');

router.post('/signup', async (req, res) => {
    var errors = {};
    const user = await User.findOne({username: req.body.username});

    const newUser = new User({
                                username: req.body.username,
                                password: req.body.password,
                                lastname: req.body.lastname,
                                firstname: req.body.firstname,
                                email: req.body.email,
                                date_birth: req.body.date_birth,
                                student_number: req.body.student_number,
                                accept_condition: req.accept_condition
                            });

    try {
        await newUser.save();
    } catch(e) {
        errors = e;
        return res.status(400).json(e);
    }

    return res.status(200).json({});
});

router.post('/login', async (req, res) => {
    const errors = {};
    const username = req.body.username
    const password = req.body.password;
    const user = await User.findOne({ username }).select("+password");

    // return if there was no user with this username found in the database
    if (!user) {
        errors.message = "Aucun compte a été trouvé.";
        return res.status(400).json(errors);
    }

    isMatch = await bcrypt.compare(password, user.password);
    //isMatch = password == user.password;
    // return 400 if password does not match
    if (!isMatch) {
        errors.message = "Password is incorrect";
        return res.status(400).json(errors);
    }

    const payload = {
        id: user._id,
        username: user.username
    };

    token = await jwt.sign(payload, secret, { expiresIn: 36000 });

    // return 500 if token is incorrect
    if (!token) {
        return res.status(500)
            .json({ error: "Error signing token",
                raw: err });
    }

    return res.json({
        success: true,
        token: `Bearer ${token}` });
});

router.post('/pay_adhesion', async (req, res) => {
    const student_number = req.body.student_number;

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    if (!student_number)
        return res.status(400);

    const dbUser = await User.findOne({student_number: req.body.student_number});

    if (dbUser){
        dbUser.date_subscription = "" + (new Date()).toISOString().split('T')[0];

        dbUser.save();
        return res.status(200).json({ success: "Le payement de la adhesion a été prise en compte." });        
    } else {
        return res.status(400).json({error : e});
    }
});

router.get('/me', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    const username = req.user.username;
    const dbUser = await User.findOne({ username });
    return res.status(200).json(dbUser);
});

router.post('/me/update', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    const username = req.user.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const date_birth = req.body.date_birth;
    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.password;

    if (!firstname && !lastname && !email && !date_birth && !passport)
        return res.status(200);

    const dbUser = await User.findOne({ username }).select("+password");

    if (newPassword) {
        if (!oldPassword)
            return res.status(400).json({message:"Please fill you current password."});
        const passwordMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(oldPassword, dbUser.password,function(err, isMatch){
                console.log(err);

                if(err) return reject(err);
                resolve(isMatch);
            });
        });
        if (!passwordMatch) {
            return res.status(400).json({message:"Old password incorrect."});
        }
        dbUser.password = newPassword;
    }
    if (firstname)
        dbUser.firstname = firstname;
    if (lastname)
        dbUser.lastname = lastname;
    if (email)
        dbUser.email = email;
    if (date_birth)
        dbUser.date_birth = date_birth;

    try {
        await dbUser.save();
    } catch (e) {
        return res.status(400).json(e);
    }
    res.status(200).json();
});

router.get('/etudiants', async (req, res) => {
    const users = await User.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return res.status(200).json(users);
});

module.exports = router;
