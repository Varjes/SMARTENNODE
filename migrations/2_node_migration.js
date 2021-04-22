var Node = artifacts.require("./nodeContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Node);
};
