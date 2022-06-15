// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./utils/multi-sig.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract EvitaToken is ERC20BurnableUpgradeable, OwnableUpgradeable,MultiSigWallet {
    string public name_;
    string public symbol_;
    uint256 public allSupply;
    address public owner_first;

    // todo in 2: move to init
    constructor(uint256 _initialSupply) /* ERC20BurnableUpgradeable("Evita", "EVI") */ {
        name_ = "Evita";
        symbol_ = "EVI";
        allSupply = _initialSupply;
        _mint(msg.sender, _initialSupply * 10**decimals());
        owner_first = msg.sender;
        //_addOwners(owner_first, 1);

    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function addOwners(
        address[] memory _owners, 
        uint _numConfirmationsRequired
    ) public onlyOwner {
        _addOwners(_owners, _numConfirmationsRequired);
    }

}
