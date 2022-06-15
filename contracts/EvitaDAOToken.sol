// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract EvitaDAOToken is ERC721Upgradeable, OwnableUpgradeable {
    string public name_;
    string public symbol_;

    // todo in 8: move to init
    constructor() /* ERC721Upgradeable("EvitaDAO", "EVD") */ {
        name_ = "EvitaDAO";
        symbol_ = "EVD";
    }
}
