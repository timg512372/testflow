require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  CryptoUtils,
  LocalAddress,
  Client,
  NonceTxMiddleware,
  SignedTxMiddleware,
  LoomProvider
} = require("loom-js");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");
const TestFactory = require("../contracts/TestFactory.json");
const Web3 = require("web3");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET, TIME, PRIVATE_KEY } = process.env;

router.get("/", (req, res) => {
  res.status(200);
  res.send("Authentication API");
});

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ Username: req.body.userName });
  if (user) {
    return res.status(400).json({
      userName: "User already exists"
    });
  }

  const privateKey = CryptoUtils.generatePrivateKey();
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
  const address = LocalAddress.fromPublicKey(publicKey).toString();

  const loomPrivateKey = CryptoUtils.B64ToUint8Array(PRIVATE_KEY);
  const loomPublicKey = CryptoUtils.publicKeyFromPrivateKey(loomPrivateKey);
  const loomAddress = LocalAddress.fromPublicKey(loomPublicKey).toString();

  let client = new Client(
    "extdev-plasma-us1",
    "wss://extdev-plasma-us1.dappchains.com/websocket",
    "wss://extdev-plasma-us1.dappchains.com/queryws"
  );

  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(loomPrivateKey)
  ];

  let web3 = new Web3(new LoomProvider(client, loomPrivateKey));
  let testFactoryInstance = new web3.eth.Contract(
    TestFactory.abi,
    TestFactory.networks["9545242630824"].address
  );

  if (req.body.role == "hospital") {
    await testFactoryInstance.methods.becomeHospital(address).send({
      from: loomAddress
    });
  }

  if (req.body.role == "factory") {
    await testFactoryInstance.methods.becomeFactory(address).send({
      from: loomAddress
    });
  }

  if (req.body.role == "lab") {
    await testFactoryInstance.methods.becomeLab(address).send({
      from: loomAddress
    });
  }

  if (req.body.role == "fda") {
    await testFactoryInstance.methods.becomeFDA(address).send({
      from: loomAddress
    });
  }

  const newUser = new User({
    institution: req.body.institution,
    userName: req.body.userName,
    password: req.body.password,
    role: req.body.role,
    location: req.body.location,
    address,
    privateKey,
    date: Date.now()
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  newUser.password = hash;
  await newUser.save();

  const payload = {
    id: newUser.id,
    institution: newUser.institution,
    userName: newUser.userName,
    role: newUser.role,
    location: newUser.location,
    date: newUser.date,
    address: newUser.address,
    date: newUser.date
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

  const user = await User.findOne({ userName: req.body.userName });

  if (!user) {
    return res.status(400).json({
      userName: "User not found"
    });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      institution: user.institution,
      userName: user.userName,
      role: user.role,
      location: user.location,
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
    const user = await User.findOne({ userName: req.user.userName }).lean();
    return res.status(200).json(user);
  }
);

module.exports = router;
