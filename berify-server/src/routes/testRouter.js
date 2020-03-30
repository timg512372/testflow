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
const Import = require("../models/import");
const HospitalExport = require("../models/hospitalExport");
const LabImport = require("../models/labImport");
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
  "/factoryExports",
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
  "/hospitalObtain",
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
      await testFactoryInstance.methods
        .hospitalObtain(
          testId,
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${req.body.test}`
        )
        .send({
          from: address
        });
    } catch (e) {
      return res.sendStatus(400);
    }

    const newImport = new Import({
      hospitalId: user._id,
      testId,
      date: Date.now()
    });

    await newImport.save();

    res.sendStatus(200);
  }
);

router.get(
  "/hospitalImports",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ userName: req.user.userName }).lean();
    if (!user) {
      return res.sendStatus(400);
    }

    const imports = await Import.find({ hospitalId: user._id });
    res.json({ imports });
  }
);

router.post(
  "/labTransfer",
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
      await testFactoryInstance.methods.labTransfer(testId).send({
        from: address
      });
    } catch (e) {
      return res.sendStatus(400);
    }

    const newHospitalExport = new HospitalExport({
      hospitalId: user._id,
      testId,
      date: Date.now()
    });

    await newHospitalExport.save();

    res.sendStatus(200);
  }
);

router.get(
  "/hospitalExports",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ userName: req.user.userName }).lean();
    if (!user) {
      return res.sendStatus(400);
    }

    const exports = await HospitalExport.find({ hospitalId: user._id });
    res.json({ exports });
  }
);

router.post(
  "/labObtain",
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
      await testFactoryInstance.methods
        .labObtain(
          testId,
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${req.body.test}`
        )
        .send({
          from: address
        });
    } catch (e) {
      return res.sendStatus(400);
    }

    const newLabImport = new LabImport({
      labId: user._id,
      testId,
      date: Date.now()
    });

    await newLabImport.save();

    res.sendStatus(200);
  }
);

router.get(
  "/labImports",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ userName: req.user.userName }).lean();
    if (!user) {
      return res.sendStatus(400);
    }

    const imports = await LabImport.find({ hospitalId: user._id });
    res.json({ imports });
  }
);

router.post(
  "/update",
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
      await testFactoryInstance.methods
        .updateTest(testId, req.body.result)
        .send({
          from: address
        });
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }

    res.sendStatus(200);
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

router.post(
  "/defaultCheck",
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

    const test = await testFactoryInstance.methods
      .checkTest(req.body.testId)
      .call({ from: address });

    const factory = await User.findOne({
      address: test.factory.toLowerCase()
    }).lean();
    const authority = await User.findOne({
      address: test.authority.toLowerCase()
    }).lean();

    test.factoryUser = factory;
    test.authorityUser = authority;

    res.json({ test });
  }
);

router.get(
  "/manufacturers",
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

    const manufacturers = await User.find({ role: "factory" }).lean();

    const sort = manufacturers.map(async (factory, index) => {
      const certification = await testFactoryInstance.methods
        .checkCertification(factory.address)
        .call({ from: address });

      manufacturers[index].certification = certification;
    });

    await Promise.all(sort);

    res.json({ manufacturers });
  }
);

router.post(
  "/certify",
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

    try {
      await testFactoryInstance.methods.certifyFactory(req.body.factory).send({
        from: address
      });
    } catch (e) {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  }
);

router.get(
  "/track",
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

    const totalSupply = await testFactoryInstance.methods.totalSupply().call({
      from: address
    });

    const tests = Array.from({ length: totalSupply });

    let tested = 0,
      inTransit = 0;

    const factories = await User.find({ role: "factory" }).lean();
    const hospitals = await User.find({ role: "hospital" }).lean();
    const labs = await User.find({ role: "lab" }).lean();

    const factoriesQuery = factories.map(async (factory, index) => {
      let produced = 0;
      const batches = await Batch.find({ factoryId: factory._id });
      const exports = await Export.find({ factoryId: factory._id });
      for (let i = 0; i < batches.length; i++) {
        produced += batches[i].quantity;
      }

      factories[index].produced = produced;
      factories[index].shipped = exports.length;
      factories[index].inTransit = 0;
      factories[index].inStock = 0;
    });

    await Promise.all(factoriesQuery);

    const hospitalsQuery = hospitals.map(async (hospital, index) => {
      const imports = await Import.find({ hospitalId: hospital._id });
      const exports = await HospitalExport.find({ hospitalId: hospital._id });

      hospitals[index].received = imports.length;
      hospitals[index].shipped = exports.length;
      hospitals[index].inTransit = 0;
      hospitals[index].inStock = 0;
    });

    await Promise.all(hospitalsQuery);

    const labsQuery = labs.map(async (lab, index) => {
      const imports = await LabImport.find({ labId: lab._id });
      labs[index].received = imports.length;
      labs[index].tested = 0;
      labs[index].inStock = 0;
    });

    await Promise.all(labsQuery);

    const query = tests.map(async (test, id) => {
      const testData = await testFactoryInstance.methods.checkTest(id).call({
        from: address
      });

      if (testData.tested) {
        tested++;
      }

      if (testData.inTransit) {
        inTransit++;
      }

      for (let i = 0; i < factories.length; i++) {
        if (
          testData.authority.toLowerCase() == factories[i].address.toLowerCase()
        ) {
          if (testData.inTransit) {
            factories[i].inTransit++;
          } else {
            factories[i].inStock++;
          }

          break;
        }
      }

      for (let i = 0; i < hospitals.length; i++) {
        if (
          testData.authority.toLowerCase() == hospitals[i].address.toLowerCase()
        ) {
          if (testData.inTransit) {
            hospitals[i].inTransit++;
          } else {
            hospitals[i].inStock++;
          }

          break;
        }
      }

      for (let i = 0; i < labs.length; i++) {
        if (testData.authority.toLowerCase() == labs[i].address.toLowerCase()) {
          if (testData.tested) {
            labs[i].tested++;
          } else {
            labs[i].inStock++;
          }

          break;
        }
      }
    });

    await Promise.all(query);

    res.json({
      tested,
      stock: totalSupply - tested,
      inTransit,
      factories,
      hospitals,
      labs,
      totalSupply
    });
  }
);

module.exports = router;
