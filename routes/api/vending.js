const express = require("express");
const router = express.Router();

const Vending = require("../../models/Vending");


// @route   Get api/vending/location
// @desc    Get All vendings 
// @access  Public
router.get("/", async (req, res) => {
    try {
        const vendings = await Vending.find();
        res.json(vendings);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


// @route   Get api/vending/location
// @desc    Get All vendings 
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const vending = await Vending.findById(req.params.id)
        if(!vending) return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        res.json(vending);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   Put web/vending/location
// @desc    Add Vending to plage
// @access  Public
router.post("/:id", async (req, res) => {
    try {
        console.log(1)
        let plage = await Plage.findById(req.params.id)
        if(!plage) return res.status(404).json({msg:'error plage mich mayjouda'})
        console.log(11)
        const vendings = await Vending.find({num: req.body.num})
        if(vendings.length>0) return res.status(404).json({msg:'error num vending mayjouda'})
       console.log(2)
        const newVending= new Vending({
            num: req.body.num,
            lat: plage.lat,
            lng: plage.lng,
            status: "OFF_LIGNE",
            plage: plage._id
        });
        
        const vending = await newVending.save();
        console.log(vending)
        plage.vendings.unshift(vending)
        console.log(plage)
        plage= await plage.save()
        console.log(plage)
        return res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});










module.exports = router