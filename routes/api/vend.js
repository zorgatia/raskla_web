const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Vend = require('../../models/Vend');
const Vending = require('../../models/Vending');

// @route   POST api/product
// @desc    add new vend
// @access  Public

router.post('/',async(req,res)=>{
    try {
        const {numero,qr,products}=req.body
        let vending = await Vending.findOne({numero:numero})
        if(!vending) return res.status(404).json({msg:"error vending"})
        
        const newVend = new Vend({
           vending:vending,
           qr:qr,
           products:products
       });
       const vend = await newVend.save()
       vending.vends.push(vend)
       await vending.save();
       res.json(vend)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route   Get api/vend/face
// @desc    
// @access  Public
router.post("/face", async (req, res) => {
    try {
      const { email, qr } = req.body;
      console.log(email)
      let user = await User.findOne({email:email})
      let vend = await Vend.findOne({qr:qr})
      if(!user) return res.status(404).json({error:"user not found"})
      if(!vend) return res.status(404).json({error:"vend not found qr error"})
      vend.qr=null
      vend.user=user
      vend= await vend.save();
      user.credit=user.credit+vend.products.length*0.25
      user.vends.push(vend)
      user= await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  });


// @route   GET api/product
// @desc    get product by id
// @access  Private

router.get('/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.param.id);
        res.json(product)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports= router;