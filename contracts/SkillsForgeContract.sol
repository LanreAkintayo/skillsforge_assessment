// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillsForgeContract {
    mapping(address => uint) public balances;

    event Deposit(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amount);


    function deposit() public payable {
        require(msg.value > 0, "Invalid Amount");

        balances[msg.sender] += msg.value;

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint _amount) public {
        require(_amount > 0, "Invalid Amount");
        require(balances[msg.sender] >= _amount, "Insufficient balance.");
        
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);

        emit Withdrawal(msg.sender, _amount);
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

}