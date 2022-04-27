//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Mint is ERC20 {
  address public minter;

  mapping (address => uint256) private _whitelist;

  uint maxMintAmount = 5;

  function setWhitelist(address _in) external {
    _whitelist[_in] = 0;
  }

  constructor() payable ERC20("Longevity", "LGY") {
    minter = msg.sender; 
  }

  function mint(uint256 amount) public payable {
		require(_whitelist[msg.sender] + amount < maxMintAmount, "Exceeded Max Mint Allocated");
		_mint(msg.sender, amount);
    _whitelist[msg.sender]+=amount;
	}

    function checkMint() public view returns (uint256){
        return _whitelist[msg.sender];
    }
}
