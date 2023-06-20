const SkillsForgeContract = artifacts.require("SkillsForgeContract");
const {toBigNumber, toWei, obtainGasFee} = require("../utils/helpers")
const truffleAssert = require('truffle-assertions');


contract('SkillsForgeContract', (accounts) => {
  it('should be able to deposit ether into the SkillsForgeContract', async () => {
    const contractInstance = await SkillsForgeContract.deployed();

    const depositor = accounts[0]
    const depositorBalanceBefore = await web3.eth.getBalance(depositor)

    const balance = await contractInstance.getBalance({from: depositor})

    assert.equal(balance, 0, "Balance is greater than 0");

    // Let's try to deposit 0 ETHER into SkillsForge and check if it is going to fail
    await truffleAssert.reverts(
      contractInstance.deposit({ from: depositor, value: 0 }),
      "Invalid Amount"
    );

    // Let's deposit into the SkillsForgeContract
    const depositorAmount = web3.utils.toWei("10", "ether")

    const receipt = await contractInstance.deposit({ from: depositor, value: depositorAmount });
    const gasUsed = receipt.receipt.gasUsed;

    const tx = await web3.eth.getTransaction(receipt.tx);
    const gasPrice = toBigNumber(tx.gasPrice);

    const gasFee = gasPrice.mul(toBigNumber(gasUsed))
    
    const newBalance = await contractInstance.getBalance({from: depositor})

    assert.equal(newBalance, depositorAmount, "Balance should not be 0");

    // Let's make sure that 10 ether has been taken away from the balance of the depositor
    const depositorCurrentBalance = toBigNumber(await web3.eth.getBalance(depositor))
    const actual = toBigNumber(depositorBalanceBefore)
    const expected =  depositorCurrentBalance.add(toBigNumber(depositorAmount)).add(gasFee)

    assert.equal(actual.toString(), expected.toString(), "Balance has not been subtracted")

  
  });


  it("should be able to withdraw from SkillsForgeContract", async () => {
    const contractInstance = await SkillsForgeContract.deployed();

    const depositor = accounts[0]

  
    const depositorAmount = web3.utils.toWei("10", "ether")

    // Let's try to deposit 0 ETHER inside the smart contract and check if it will fail
    await truffleAssert.reverts(
      contractInstance.deposit({ from: depositor, value: 0 }),
      "Invalid Amount"
    );
    

    // Now, Let's deposit the actual amount
    await contractInstance.deposit({ from: depositor, value: depositorAmount });


    // Let's try to withdraw with an account that didn't deposit
    const amountToWithdraw = toWei(10)

    await truffleAssert.reverts(
      contractInstance.withdraw(amountToWithdraw, {from: accounts[1]}),
      "Insufficient balance"
    );


    // Now Let depositor tries to withdraw amount
    const balanceBefore = await web3.eth.getBalance(depositor)
    const withdrawReceipt = await contractInstance.withdraw(amountToWithdraw, {from: depositor})
    const gasFee = await obtainGasFee(withdrawReceipt)

    const balanceAfter = await web3.eth.getBalance(depositor)

    const expected = toBigNumber(balanceBefore).add(toBigNumber(amountToWithdraw)).sub(gasFee)

    assert.equal(balanceAfter.toString(), expected.toString(), "Amount is not in sync")
  
  });

});

