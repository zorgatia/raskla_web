const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Data = require('../../models/Data');
const User = require('../../models/User');



// @route   GET mob/data
// @desc    Get Last Time Post Data
// @access  Private

router.get('/dash',async (req,res)=>{
    try {
 
        const datas = await Data.countDocuments()
        return res.json(data)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST mob/data
// @desc    Send Photo To Data
// @access  Private
router.post('/:id',async(req,res)=>{
    try {
        const {path,product} = req.body
        const user = await User.findById(req.params.id)
        let data= await Data.findOne({user:req.params.id},{},{date:1})
        let minutes = 61
        if(data) {
            const diff = Math.abs(new Date() - new Date(data.date));
            minutes = Math.floor((diff/1000)/60);
            
        }
        if(minutes<60){
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
        const user = await User.findById(req.body.user)
        if(!user) return res.json("user errur")

        const votes = req.body.votes
        
        votes.forEach( async v => {
            const data= await Data.findById(v.data)
            
            if(data){
                data.votes.push({user:user,vote:v.vote})
                data.save()
            }
        }); 
        res.json(user)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;