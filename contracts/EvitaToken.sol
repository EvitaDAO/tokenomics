// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract EvitaToken is ERC20BurnableUpgradeable, OwnableUpgradeable {
    string public name_;
    string public symbol_;

    IERC20Upgradeable public token;

    function initialize(IERC20Upgradeable _token, uint256 _initialSupply)
        public
        initializer
    {
        token = _token;
        allSupply = _initialSupply;
        _mint(msg.sender, _initialSupply * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
