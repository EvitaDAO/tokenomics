// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)

pragma solidity ^0.8.0;

//import "./utils/Ownable.sol";
//import "./utils/ERC20.sol";
//import "./utils/MintableToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
//import "@openzeppelin/contracts/token/ERC20/MintableToken.sol";


contract Evita is Ownable,ERC20,ERC20Burnable {

    string public name_;
    string public symbol_;
    uint256 public allSupply;
	
	
	constructor(uint256 _initialSupply)  ERC20("Evita", "EVI"){
        name_ = "Evita";
        symbol_ = "EVI";
        allSupply = _initialSupply;
		_mint(msg.sender, _initialSupply * 10 ** decimals());
        
    }

	function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
	

}