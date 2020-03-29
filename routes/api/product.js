const express = require('express');
const router = express.Router();



const Product = require('../../models/Product');

// @route   POST api/product
// @desc    add new product
// @access  Private

router.post('/',async(req,res)=>{
    try {
        const {code,name,price}=req.body
        const products = await Product.find({code:code});
        if(products.length>0){
            return res.json({msg:'product already exisit'})
        }
        let product= new Product({code,name,price})
        product=await product.save();
        res.json(product)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route   GET api/product
// @desc    get all products
// @access  Private

router.get('/',async(req,res)=>{
    try {
        const products = await Product.find();
        res.json(products)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


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