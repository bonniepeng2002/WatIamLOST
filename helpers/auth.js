const router = require('express').Router();
const User = require('../model/User');
const {signUpValidation, loginValidation} = require('./auth-validation');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const {valid} = require("joi");


router.post('/register', async (req,res) => {

    //validate user entry
    const {error} = signUpValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //password hashing
    const passwordHash = await argon2.hash(req.body.password);

    //check if user is not unique
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) {
        return res.status(400).send("Email already exists");
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash
    });
    try {
        const savedUser = await user.save();
        res.send({user:savedUser._id});
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req,res) => {

    //validate user entry
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //password hashing
    const passwordHash = await argon2.hash(req.body.password);

    //check if user email already exists
    const userindb = await User.findOne({email: req.body.email});
    if (!userindb) {
        return res.status(400).send("Email not found");
    }

    const validPassword = await argon2.verify(userindb.password,req.body.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    //token stuff
    const token = jwt.sign({_id: userindb._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
})

module.exports = router;