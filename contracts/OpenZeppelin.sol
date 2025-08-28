// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MirbasitToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Mirbasit", "MBS") Ownable(msg.sender) {
        // Initial mint to the deployer (owner)
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    // Extra function: Owner can mint more tokens later
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }
}
