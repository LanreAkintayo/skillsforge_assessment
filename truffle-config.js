
require('dotenv').config();
const MNEMONIC = process.env["MNEMONIC"];
const TESTNET_URL = process.env["TESTNET_URL"];
const MUMBAI_URL = process.env["MUMBAI_URL"];

 
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {

    testnet: {
      provider: () => new HDWalletProvider(MNEMONIC, TESTNET_URL),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    matic: {
      provider: () => new HDWalletProvider(MNEMONIC, MUMBAI_URL),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },


  },


  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin
    }
  }
};
