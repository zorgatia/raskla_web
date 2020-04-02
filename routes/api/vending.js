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
    const vending = await Vending.findById(req.params.id);
    if (!vending)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    res.json(vending);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   POST api/vending
// @desc    Add Vending Machine
// @access  Private
router.post("/", async (req, res) => {
  try {
    const newVending = new Vending({
      numero: req.body.numero,
      model: req.body.model,
      region: req.body.region,
      loc: {
        lat: req.body.lat,
        lng: req.body.lng
      }
    });
    const vending = await newVending.save();
    console.log(vending);
    return res.json(vending);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
