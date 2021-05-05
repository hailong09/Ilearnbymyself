const express = require('express');
const  router = express.Router();
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const cors = require('cors');


const User = require('../models/User');
const verifyToken = require('../middlewares/auth');

//@route Get api/auth
//@desc Check if usr is logged in
//@access Public
router.get('/', cors() ,verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) return res.status(400).json({ success: false, message: 'User not found' })
        res.json({success: true, user})
    } catch (error) { 
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route POST api/auth/signup
// @desc sign up user
// @access Public
router.post('/signup', cors() , async (req, res) => {
   const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
                success: false,
                message: 'Missing username and/or password'
            })
    }

    try {
        const user = await User.findOne({username});
        if(user) {return res.status(400).json({success: false, message: 'Username has taken!'})}
        else{

            // If All good
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({username, password:hashedPassword});
            await newUser.save();
            
            // Return a token
            const accessToken = jwt.sign({userId: newUser._id}, process.env.SECRET_KEY);
            return res.status(200).json({success: true, message: 'User created successfully', accessToken});

        }

        

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
    
})


// @route POST api/auth/signin
// @desc sign in user
// @access Public

router.post('/signin', cors() , async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({success: false, message: 'Missing username and/or password'})
    try {
        //check for user login or not
        const user = await User.findOne({username})
        if(!user) return res.status(400).json({success:false, message:'Incorrect username or password'});

        // if User is correct then check password
        const validPassword = await argon2.verify(user.password, password);
        if(!validPassword) return res.status(400).json({success:false, message:'Incorrect username or password'});

        // if all good
        const accessToken = jwt.sign({userId: user._id}, process.env.SECRET_KEY);
        return res.status(200).json({success: true, message: 'User logged in successfully', accessToken});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

module.exports = router