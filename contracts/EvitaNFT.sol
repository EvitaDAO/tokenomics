// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract EvitaNFT is ERC721Upgradeable, OwnableUpgradeable {

	using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(string => uint8) existingURIs;
	
	function initialize(
		string memory name_,
		string memory symbol_
	) initializer public {
        __ERC721_init(name_, symbol_);  //name_ = "EvitaNFT";  symbol_ = "EVN";
	}
	
	function Mint(
        address recipient,
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        require(existingURIs[metadataURI] != 1, 'NFT already minted!');
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;

        _mint(recipient, newItemId);
    
        //_setTokenURI(newItemId, metadataURI);  //to fix problem with ERC721URIStorage.sol - defined twice - event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

        return newItemId;
    }
}

