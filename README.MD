# PRE-REQUISITE
* After cloning or pulling from this repo, enter the command ```npm install ``` in the terminal to install all dependencies used for this project
* Make sure your .env file is set up with all the necessary keys and endpoints needed. The template is shown below;
```
MNEMONIC=app boy spoon father mother ship monitor key type row column random 
TESTNET_URL=https://data-seed-prebsc-1-s3.binance.org:8545
MUMBAI_URL= https://rpc-mumbai.maticvigil.com
```
* Note that the mnemonic provided above is just a sample as it does not subject the project to any form of exploitation. The tester should provide their own mnemonic.
* No need to change the **TESTNET_URL** and the **MUMBAI_URL**
* Note that the smart contract is deployed in **POLYGON MUMBAI TESTNET**. Hence, mumbai faucet will be needed in testing the smart contract. Faucet can be gotten here 👉👉 https://mumbaifaucet.com/
* All the items that have been listed are to be set up to ensure smooth running of the program

# CONTRACT DETAILS
Contract Address: 0x83D681a2Bce0610F2a7310c5CbD3F3470E154A5d <br/>
Link: https://mumbai.polygonscan.com/address/0x83D681a2Bce0610F2a7310c5CbD3F3470E154A5d


# COMPILATION
Enter the command shown below to compile your solidity code
```
truffle compile
```
# DEPLOYMENT
The script ```1_deploy_contracts.js``` under the migrations directory is the one deploying the smart contract.<br/> 
Enter the command shown below to deploy the smart contract to mumbai test network
```
truffle deploy --network matic
```
# Running Tests
The test file can be found in **test\skillsForge.js**. The test file has two categories of test;
* Test for the deposit() function in the smart contract. The deposit function allows users to deposit MATIC in the smart contract. To run that particular test, type the command below in the terminal
```
truffle test -- -g "should be able to deposit ether into the SkillsForgeContract"
```

* Test for the withdraw() function. The deposit function allows users to withdraw the money they've already deposited. The smart contract is designed in a way that only users that have MATIC in the contract can withdraw. The command below can be used to run this test;
```
truffle test -- -g "should be able to deposit ether into the SkillsForgeContract"
```
   
* The getBalance() function has also been tested during the course of testing the withdraw and the deposit functions.

* Note that the test is using truffle test network. This is to ensure faster execution and to save gas. 

# Running Scripts

The scripts are located in the scripts directory. 3 script are written; <br/>
1. checkBalance.js <br/>
This script is used to check the balance of a particular address in the smart contract. It can be executed with the command below;
```
truffle exec ./scripts/checkBalance.js --network matic
```

2. deposit.js <br/>
This script is used in depositing funds (MATIC) in the smart contract.

```
truffle exec ./scripts/deposit.js --network matic
```


3. withdraw.js <br/>
This script is used in withdrawing funds that has been deposited.

```
truffle exec ./scripts/withdraw.js --network matic
```