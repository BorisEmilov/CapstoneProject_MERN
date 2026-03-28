const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');


// @ GET api/profile/me
// @ get current user profile
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'No profile for this user' })
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @ POST api/profile
// @ create or update user profile
router.post('/', [auth, 
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website, 
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        X,
        instagram,
        linkedin,
    } = req.body;

    // ! boBuild profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    // ! build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(X) profileFields.social.X = X;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    
    try {
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            // * update the profile
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        };

        // ! create 
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// @ Get api/profile
// @ get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @ Get api/profile/user/:user_id
// @ get profile by user id
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if(!profile) return res.status(500).json({ message: 'profile not found' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(500).json({ message: 'profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @ DELETE api/profile
// @ delete profile, user and posts
router.delete('/', async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id });

        await User.findOneAndDelete({ _id: req.user.id });
        res.json({msg: 'user removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @ PUT api/profile/experience
// @ add profile experience
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validateonResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.experiences.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @ DELETE api/profile/experience/:exp_id
// @ delete expefrom profile
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experiences.map(i => i.id).indexOf(req.params.exp_id);
        
        profile.experiences.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @ PUT api/profile/education
// @ add profile education
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validateonResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @ DELETE api/profile/education/:edu_id
// @ delete expefrom profile
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.education.map(i => i.id).indexOf(req.params.edu_id);
        
        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @ GET api/profile/github/:username
// @ get user repos from github
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/
            repos?per_page=5&sort=created:asc&client_id=${config.get('gitClientId')}&client_secret=${config.get('gitClientSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200){
                res.status(404).json({msg: 'no github profile found'});
            }

            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;