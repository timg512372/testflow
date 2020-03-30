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
const User = require("../models/user");
const Batch = require("../models/batch");
const Export = require("../models/export");
const TestFactory = require("../contracts/TestFactory.json");
const Web3 = require("web3");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET, TIME, PRIVATE_KEY } = process.env;

router.get("/", (req, res) => {
  res.status(200);
  res.send("Test API");
});

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ userName: req.user.userName }).lean();
    if (!user) {
      return res.sendStatus(400);
    }

    let QRs = [];

    const privateKey = new Uint8Array(JSON.parse("[" + user.privateKey + "]"));
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
    const address = LocalAddress.fromPublicKey(publicKey).toString();

    let client = new Client(
      "extdev-plasma-us1",
      "wss://extdev-plasma-us1.dappchains.com/websocket",
      "wss://extdev-plasma-us1.dappchains.com/queryws"
    );

    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(privateKey)
    ];

    let web3 = new Web3(new LoomProvider(client, privateKey));
    let testFactoryInstance = new web3.eth.Contract(
      TestFactory.abi,
      TestFactory.networks["9545242630824"].address
    );

    for (let i = 0; i < req.body.quantity; i++) {
      const id = await testFactoryInstance.methods.totalSupply().call({
        from: address
      });

      const QR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user._id +
        "tokenId" +
        id}`;

      try {
        await testFactoryInstance.methods.createTest(QR).send({
          from: address
        });
      } catch (e) {
        return res.sendStatus(400);
      }

      QRs.push(QR);
    }

    const newBatch = new Batch({
      factoryId: user._id,
      QRs,
      quantity: req.body.quantity,
      date: Date.now()
    });

    await newBatch.save();

    res.sendStatus(200);
  }
);

router.get(
  "/batches",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ userName: req.user.userName }).lean();
    if (!user) {
      res.sendStatus(400);
    }

    const batches = await Batch.find({ factoryId: user._id });
    res.json({ batches });
  }
);

router.post(
  "/hospitalTransfer",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ userName: req.user.userName }).lean();
    if (!user) {
      return res.sendStatus(400);
    }

    const privateKey = new Uint8Array(JSON.parse("[" + user.privateKey + "]"));
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
    const address = LocalAddress.fromPublicKey(publicKey).toString();

    let client = new Client(
      "extdev-plasma-us1",
      "wss://extdev-plasma-us1.dappchains.com/websocket",
      "wss://extdev-plasma-us1.dappchains.com/queryws"
    );

    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(privateKey)
    ];

    let web3 = new Web3(new LoomProvider(client, privateKey));
    let testFactoryInstance = new web3.eth.Contract(
      TestFactory.abi,
      TestFactory.networks["9545242630824"].address
    );

    const preformattedTest = req.body.test.substring(
      req.body.test.indexOf("tokenId")
    );
    const testId = preformattedTest.substring(7);

    try {
      await testFactoryInstance.methods.hospitalTransfer(testId).send({
        from: address
      });
    } catch (e) {
      return res.sendStatus(400);
    }

    const newExport = new Export({
      factoryId: user._id,
      testId,
      date: Date.now()
    });

    await newExport.save();

    res.sendStatus(200);
  }
);

router.get(
  "/exports",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ userName: req.user.userName }).lean();
    if (!user) {
      return res.sendStatus(400);
    }

    const exports = await Export.find({ factoryId: user._id });
    res.json({ exports });
  }
);

router.post(
  "/check",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const privateKey = CryptoUtils.generatePrivateKey();
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
    const address = LocalAddress.fromPublicKey(publicKey).toString();

    let client = new Client(
      "extdev-plasma-us1",
      "wss://extdev-plasma-us1.dappchains.com/websocket",
      "wss://extdev-plasma-us1.dappchains.com/queryws"
    );

    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(privateKey)
    ];

    let web3 = new Web3(new LoomProvider(client, privateKey));
    let testFactoryInstance = new web3.eth.Contract(
      TestFactory.abi,
      TestFactory.networks["9545242630824"].address
    );

    const preformattedTest = req.body.test.substring(
      req.body.test.indexOf("tokenId")
    );
    const testId = preformattedTest.substring(7);

    const test = await testFactoryInstance.methods
      .checkTest(testId)
      .call({ from: address });

    res.json({ test });
  }
);

module.exports = router;