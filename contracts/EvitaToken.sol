// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract EvitaToken is ERC20BurnableUpgradeable, OwnableUpgradeable {
    function initialize(
        string memory name_,
        string memory symbol_,
        uint256 _initialSupply
    ) public initializer {
        __Ownable_init(); // OwnableUpgradeable
        __ERC20Burnable_init(); // ERC20BurnableUpgradeable
        __ERC20_init(name_, symbol_); // ERC20Upgradeable
        __Context_init(); // ContextUpgradeable
        _mint(msg.sender, _initialSupply * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
