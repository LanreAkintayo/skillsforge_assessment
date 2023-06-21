require("dotenv").config();
const MNEMONIC = process.env["MNEMONIC"];
const TESTNET_URL = process.env["TESTNET_URL"];
const MUMBAI_URL = process.env["MUMBAI_URL"];

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    avalanche: {
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: MNEMONIC
          },
          providerOrUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
        });
      },
      network_id: 43113,
      chainId: 43113,
      skipDryRun: true
    },
    testnet: {
      provider: () => new HDWalletProvider(MNEMONIC, TESTNET_URL),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 10000000000
    },

    matic: {
      provider: () => new HDWalletProvider(MNEMONIC, MUMBAI_URL),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 10000,
      pollingInterval:30000,  
      gasPrice: 1000000000  
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13", // Fetch exact version from solc-bin
      settings: {
        optimizer: {
          enabled: true, //reduce the size of the contract
          runs: 200,
        },
        evmVersion: "berlin",
      },
    },
  },
};
