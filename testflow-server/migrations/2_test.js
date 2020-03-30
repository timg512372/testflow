const TestFactory = artifacts.require("TestFactory");

module.exports = async function(deployer) {
  await deployer.deploy(TestFactory);
  console.log(TestFactory.address);
};
