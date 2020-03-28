require("dotenv").config();
const { join } = require("path");
const LoomTruffleProvider = require("loom-truffle-provider");
const { PRIVATE_KEY } = process.env;

module.exports = {
  contracts_build_directory: join(__dirname, "../src/contracts"),
  networks: {
    extdev_plasma_us1: {
      provider: function() {
        const chainId = "extdev-plasma-us1";
        const writeUrl = "http://extdev-plasma-us1.dappchains.com:80/rpc";
        const readUrl = "http://extdev-plasma-us1.dappchains.com:80/query";
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, PRIVATE_KEY);
      },
      network_id: "9545242630824"
    }
  }
};
