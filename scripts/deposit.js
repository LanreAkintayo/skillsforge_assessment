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

    // Put your deposit details here
    const depositorAddress = accounts[0]
    const amount = web3.utils.toWei("0.01", "ether");

    const depositorInitialBalance = web3.utils.fromWei(await web3.eth.getBalance(depositorAddress),"ether");
    const contractInitialBalance = web3.utils.fromWei(await web3.eth.getBalance(contractAddress),"ether");

    console.log(`Depositing ${web3.utils.fromWei(amount, "ether")} MATIC.....`)

    // Deposit ethers into the SkillsForgeContract
    await contractInstance.methods
      .deposit()
      .send({ from: depositorAddress, value: amount });

    console.log(`Successfully deposited ${web3.utils.fromWei(amount, "ether")} MATIC`)


    const depositorFinalBalance = web3.utils.fromWei(await web3.eth.getBalance(depositorAddress), "ether");
    const contractFinalBalance = web3.utils.fromWei(await web3.eth.getBalance(contractAddress),"ether");

    console.log(`\nDepositor balance before: ${depositorInitialBalance} MATIC\nDepositor balance after: ${
      depositorFinalBalance} MATIC\n\nContract Balance before: ${contractInitialBalance} MATIC\nContract Balance After: ${contractFinalBalance} MATIC\n`);

      process.exit(0)
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
};
