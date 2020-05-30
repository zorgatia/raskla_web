const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require ('config');
const {check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST web/auth
// @desc    Authenticate user & get token
// @access  Public

router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST web/auth
// @desc    Authenticate user & get token
// @access  Public

router.post('/',async (req,res) => {
        
        const { email, password} = req.body;

        try{
            // See if user exists
            let user = await User.findOne({email});
            if(!user){
               return res
               .status(400)
               .json({errors: [{ msg : 'Invalid Credentials'} ]});
            }

            
            //Return jsonwebtoken

            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res
                    .status(400)
                    .json({errors : [{msg: 'Invalid Credentials'}] })
            }
            user.password = null;

           return res.json(user)
            
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
});

//@route        POST api/auth/fb
//@desc         Authenticate user & get token
//@access       Public
router.post(
    "/fb",
    [
      check("email", "Please include a valid email").isEmail()
    ],
    async (req, res) => {
    
      
      const { email } = req.body;
      console.log(email);
      
      try {
        //See if user exists
        let user = await User.findOne({ email});
        if (!user) {
         user = await new User({email:email , password:"FACEBOOK"}).save()
        }
  
        
       res.json(user)
       
  
        
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error....");
      }
    }
  );



module.exports= router;