const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @ POST api/users
// @ Register new user
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'include a valid emil').isEmail(),
    check('password', 'enter a password with min leng 6 characters').isLength({min: 6})
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {name, email, password} = req.body;

    try {
        // ! check if user alredy exists
        let user = await User.findOne({ email });
        if(user){
            res.status(400).json({errors: [{msg: 'user alredy exists'}]})
        }

        // ! get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        // create a new user
        user = new User({
            name,
            email,
            avatar,
            password
        })
        // password encriptation
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save(); // save it to the database

        // ! JWT
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
            if(err) throw err;
            res.json({ token })
        });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

module.exports = router;