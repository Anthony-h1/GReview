// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    address public commentContract;

    constructor() ERC20("RewardToken", "RTK") Ownable(msg.sender) {}

    // Function to set the address of the Comment contract
    function setCommentContract(address _commentContract) external onlyOwner {
        commentContract = _commentContract;
    }

    // Function to mint tokens, callable only by the Comment contract
    function mint(address to, uint256 amount) external {
        require(msg.sender == commentContract, "Only the Comment contract can mint tokens");
        _mint(to, amount);
    }
}

