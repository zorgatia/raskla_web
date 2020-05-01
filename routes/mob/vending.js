const express = require("express");
const router = express.Router();

const Vending = require("../../models/Vending");
const Vend = require("../../models/Vend");
const User = require("../../models/User");

const haversine_distance = (mk1, mk2) => {

  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180) // Radian difference (longitudes)
  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};

// @route   Get mob/vending
// @desc    Get All vendings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const vendings = await Vending.find();
    console.log(vendings);

    res.json(vendings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   Get mob/vending/loc
// @desc    Get All vendings by location
// @access  Public
router.get("/loc", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    let vendings = await Vending.find();
    
    vendings = vendings.map(v => {
      v=v.toObject()
      v.dist = Math.round(haversine_distance({lat,lng},{lat:v.loc.lat,lng:v.loc.lng})* 10) / 10
      return v;
    });
    vendings.sort((a,b)=>a.dist-b.dist)
    //console.log(vendings);

    res.json(vendings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});


// @route   Get mob/vending/loc
// @desc    Get All vendings by location
// @access  Public
router.post("/qr", async (req, res) => {
  try {
    const { id, qr } = req.body;

    let user = await User.findById(id)
    let vend = await Vend.findOne({qr:qr})
    if(!user) return res.status(404).json({error:"user not found"})
    if(!vend) return res.status(404).json({error:"vend not found qr error"})
    vend.qr=""
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

// @route   Get mob/vending/location
// @desc    Get vending machine by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const vending = await Vending.findById(req.params.id);
    if (!vending)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    res.json(vending);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});



module.exports = router;
