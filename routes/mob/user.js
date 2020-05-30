const express = require("express");

const router = express.Router();

const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const fetch = require('node-fetch');


const auth = require("../../middleware/auth");

const User = require("../../models/User");


// @route   POST api/user
// @desc    Register user
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const username = email.replace(/@.*$/, "");
    
    user = new User({
     
      email,
      password,
      comfirmed: true
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    user=await user.save();
    res.json(user);
   // const users = await User.find({ role: { $in: ["ADMIN"] } });
   // res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



// @route   GET web/user/me
// @desc    Get current users
// @access  Private

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({path:"vends",options:{sort:{"date":-1}}});
    if (!user) {
      return res.status(400).json({ msg: "There is no user" });
    }
    res.json(user.vends);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});




// @route   GET web/user/me
// @desc    Get current users
// @access  Private
/*
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "There is no user" });
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
*/
// @route   GET web/user/all
// @desc    get all users
// @access  Public
/*
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error server");
  }
});
*/
// @route   GET web/user/members
// @desc    get all members user
// @access  Private
/*
router.get("/members", auth, async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["ADMIN","MUNIC","ECO","TECH"] } });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error server");
  }
});
*/
// @route   GET web/user/:user_id
// @desc    get user by ID
// @access  Public
/*
router.get("/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select("-password");

    if (!user)
      return res.status(404).json({ mgs: "there is no profile for this user" });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "profile not found" });
    }
    res.status(500).send("error server");
  }
});
*/
// @route   DELETE api/profile
// @desc    delete profile ,user & posts
// @access  Private
/*
router.delete("/", auth, async (req, res) => {
  try {
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    const users = await User.find({ type: { $in: ["ADMIN"] } });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error server");
  }
});*/

// @route   DELETE web/user/:id
// @desc    delete member
// @access  Public
/*
router.delete("/:id",  async (req, res) => {
  try {
    // remove user
    const user = await User.findOneAndRemove({ _id: req.params.id });
    //const users = await User.find({ type: { $in: ["ADMIN"] } });
    res.json({msg: 'delete'});
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error server");
  }
});

*/

// @route   PUT api/user/profile
// @desc    delete profile ,user & posts
// @access  Private
router.post("/profile/:id", async (req, res) => {
  const {
    lastname,
    firstname,
    username,
    birthday,
    region,
    gender,
    image,
    phone
  } = req.body;

  try {
    const user = await User.findById(req.params.id);

    user.lastname = lastname;
    user.firstname = firstname;
    user.username = username;
    user.birthday = birthday;
    user.region = region;
    user.gender = gender;
    user.image = image;
    user.phone = phone;

    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/user/follow
// @desc    put follow on plage
// @access  Private

router.post("/image", async (req, res) => {
  try {
    let base64Img = req.body.image;
    //Add your cloud name
    let apiUrl = "https://api.cloudinary.com/v1_1/dov1qarzt/image/upload";
    let data = {
      file: base64Img,
      upload_preset: "userface",
    };
    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        console.log(data.secure_url);
        return res.json(data.secure_url)
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
/*
// @route   POST web/user/changepassword
// @desc    change password
// @access  Private
router.post("/changepassword", auth, async (req, res) => {
  try {
    // console.log('bla')
    const user = await User.findById(req.user.id).select("password");
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "mot de passe incorrect" }] });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);

    await user.save();
    res.json({ msg: "mot de passe change avec success" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   POST web/user/changepassword
// @desc    change password
// @access  Private

router.post("/mdpoublier", async (req, res) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    sendEmail(
      email,
      "recuperation mot de passe",
      "http://localhost:3000"
    );

    res.json({ test: "set" });
  } catch (err) {
    console.log(err);

    res.json({ test: "tesasdt" });
  }
});
*/
module.exports = router;
