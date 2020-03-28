require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { CryptoUtils, LocalAddress } = require("loom-js");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET, TIME } = process.env;

router.get("/", (req, res) => {
  res.status(200);
  res.send("Authentication API");
});

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      email: "User already exists"
    });
  }

  const privateKey = CryptoUtils.generatePrivateKey();
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
  const address = LocalAddress.fromPublicKey(publicKey).toString();

  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
    role: req.body.role,
    address,
    privateKey
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  newUser.password = hash;
  await newUser.save();

  const payload = {
    id: newUser.id,
    email: newUser.email,
    userName: newUser.userName,
    role: newUser.role,
    date: newUser.date,
    address: newUser.address
  };

  const token = await jwt.sign(payload, SECRET, {
    expiresIn: TIME
  });

  return res.status(201).json({
    success: true,
    token: `Bearer ${token}`
  });
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      email: "User not found"
    });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      email: user.email,
      userName: user.userName,
      role: user.role,
      date: user.date,
      address: user.address
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: TIME });
    return res.json({ success: true, token: `Bearer ${token}` });
  } else {
    return res.status(400).json({
      password: "Incorrect Password"
    });
  }
});

router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).lean();
    return res.status(200).json(user);
  }
);

module.exports = router;
