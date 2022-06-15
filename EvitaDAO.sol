// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EvitaDAO is Ownable, ERC721 {
    string public name_;
    string public symbol_;

    constructor() ERC721("EvitaDAO", "EVD") {
        name_ = "EvitaDAO";
        symbol_ = "EVD";
    }
}
