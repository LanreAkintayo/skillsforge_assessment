const {
    abi,
    networks,
  } = require("../build/contracts/SkillsForgeContract.json");
  
  module.exports = async function () {
    try {
      const networkId = await web3.eth.net.getId();
  
      const contractAddress = networks[networkId].address;
  
      const contractInstance = new web3.eth.Contract(abi, contractAddress);
  
      const accounts = await web3.eth.getAccounts();
  
      // Put the wallet to check its balance here
      const depositorAddress = accounts[0];
  
      console.log(
        `Checking Balance.....`
      );
  
      const balance = await contractInstance.methods
        .getBalance()
        .call({ from: depositorAddress });
  
      console.log(
        `Balance of ${depositorAddress} in SkillsForgeContract: ${web3.utils.fromWei(balance, "ether")} MATIC\n`
      );
  
    
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  