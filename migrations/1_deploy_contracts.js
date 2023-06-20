const SkillsForgeContract = artifacts.require("SkillsForgeContract");

module.exports = function(deployer) {
  deployer.deploy(SkillsForgeContract);
  deployer.deploy(SkillsForgeContract);
};
