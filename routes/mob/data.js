const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Data = require('../../models/Data');
const User = require('../../models/User');



// @route   GET mob/data
// @desc    Get Last Time Post Data
// @access  Private

router.get('/',async(req,res)=>{
    try {
        let data= await Data.find({user:req.user.id},{},{data:1})
        const diff = Math.abs(new Date() - new Date(data.date));
        const minutes = Math.floor((diff/1000)/60);
        return res.json(60-minutes)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST mob/data
// @desc    Send Photo To Data
// @access  Private
router.post('/',async(req,res)=>{
    try {
        const {path,product} = req.body
        const user = await User.findById(req.user.id)
        let data= await Data.findOne({user:req.user.id},{},{data:1})
        const diff = Math.abs(new Date() - new Date(data.date));
        const minutes = Math.floor((diff/1000)/60);
        if(data &&  minutes<60){
            
            return res.json(60-minutes)
        }
        data=new Data()
        data.user=user
        data.path=path
        data.product=product
        data=await data.save();
        res.json(data)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route   PUT mob/data
// @desc    Vote Data Photo
// @access  Private
router.put('/'  ,async(req,res)=>{
    try {
        const data= await Data.findById(req.body.data)
        if(!data)
            return res.status(404).json({msg:"data not Found"})
        data.yes.some(u=>u.id==req.id)
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;