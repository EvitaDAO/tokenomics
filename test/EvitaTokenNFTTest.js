const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('EvitaNFT', () => {
  let token;
  let owner;
  let user1;
  let user2;


  beforeEach(async () => {
    const EvitaNFT = await ethers.getContractFactory('EvitaNFT');
    [owner, user1, user2] = await ethers.getSigners();
    token = await upgrades.deployProxy(EvitaNFT, [
      'EvitaNFT',
      'EVN'
    ]);
  });

  
  
  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });


  });
  
  
  
  

  describe('Minting', () => {
    
	it('Should mint NFT to recipient but not to owner', async () => {
      const linkToMint1 = 'https://example.com/my-inf-1';
      const mintNum = await token.Mint(
        user1.address,
        linkToMint1
      );

      const newOwnerBalance = await token.balanceOf(owner.address);
      expect(newOwnerBalance).to.equal(0);

      const user1Balance = await token.balanceOf(user1.address);
      expect(user1Balance).to.equal(1);
    });
	
	it('Should mint NFT to first recipient with one URL and second recipient with another URL...', async () => {
      const linkToMint1 = 'https://example.com/my-inf-1';
	  const linkToMint2 = 'https://example.com/my-inf-2';
      const mintNum = await token.Mint(
        user1.address,
        linkToMint1
      );

      const user1Balance = await token.balanceOf(user1.address);
      expect(user1Balance).to.equal(1);
	  
	  	  
	  const mintNum2 = await token.Mint(
        user2.address,
        linkToMint2
      );

      const user1Balance2 = await token.balanceOf(user2.address);
      expect(user1Balance2).to.equal(1);
    });
	
	it('Should NOT mint NFT with the same URL', async () => {
      const linkToMint1 = 'https://example.com/my-inf-1';
	  const linkToMint2 = 'https://example.com/my-inf-2';
      const mintNum = await token.Mint(
        user1.address,
        linkToMint1
      );
	  try {await token.Mint(
			user2.address,
			linkToMint1
		);

		  const user1Balance = await token.balanceOf(user1.address);
		  expect(user1Balance).to.equal(1);
      } catch {

		  const user1Balance = await token.balanceOf(user1.address);
		  expect(user1Balance).to.equal(1);
      }
	  
    });
	
	
	/*
	it('Should mint NFT and save URL of NFT to existingURIs[linkToMint1]', async () => {
      const linkToMint1 = 'https://example.com/my-inf-1';
      const mintNum = await token.Mint(
        user1.address,
        linkToMint1
      );
	  const linkToMintNum = token.existingURIs[linkToMint1];
	  console.log("num1: ", linkToMintNum);
	  console.log("num2: ", amount);
	  console.log("num3: ", mintNum);
	  //console.log("num4: ", await token.tokenURIs[mintNum]);
	  console.log("equal? ", amount == linkToMintNum);
      expect(linkToMintNum).to.equal(1);
    });
	*/
	
  });

/*
  describe('Transactions', () => {
    
    it('Should transfer tokens between accounts', async () => {		
	  const linkToMint1 = 'https://example.com/my-inf-1';
      const itemId = await token.Mint(
        user1.address,
        linkToMint1
      );
	  const user1Balance = await token.balanceOf(user1.address);
      expect(user1Balance).to.equal(1);
	  
	  const user2Balance = await token.balanceOf(user2.address);
      expect(user2Balance).to.equal(0);
	  
	  await token.transferFrom(
        user1.address,
		user2.address,
        itemId
      );

      const user11Balance = await token.balanceOf(user1.address);
      expect(user11Balance).to.equal(0);
	  
	  const user22Balance = await token.balanceOf(user2.address);
      expect(user22Balance).to.equal(1);
    });

  });
*/

/*
  describe('Burning', () => {
    it('Should burn owner tokens', async () => {
      const etherToBurn = 5;
      await token.burn(ethers.utils.parseEther(`${etherToBurn}`));
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(
        ethers.utils.parseEther(`${initialSupply - etherToBurn}`)
      );
    });

    it('Should burn user tokens', async () => {
      const etherToTransfer = 5;
      const etherToBurn = 2;
      await token.transfer(
        user1.address,
        ethers.utils.parseEther(`${etherToTransfer}`)
      );
      await token
        .connect(user1)
        .burn(ethers.utils.parseEther(`${etherToBurn}`));
      const userBalance = await token.balanceOf(user1.address);
      expect(userBalance).to.equal(
        ethers.utils.parseEther(`${etherToTransfer - etherToBurn}`)
      );
      expect(await token.totalSupply()).to.equal(
        ethers.utils.parseEther(`${initialSupply - etherToBurn}`)
      );
    });
  });
*/ 
  
  
  
  /*
  describe('works before', () => {
	it('works before and after upgrading', async function () {
		
		beforeEach(async () => {
			const EvitaNFT = await ethers.getContractFactory('EvitaNFT');
			[owner, user1, user2] = await ethers.getSigners();
			token = await upgrades.deployProxy(EvitaNFT, [
			'EvitaNFT',
			'EVN',
			initialSupply,
			]);
		});
		
				
	  const token2 = await upgrades.deployProxy(EvitaNFT);
	  assert.strictEqual(await token2.retrieve());

	  await upgrades.upgradeProxy(token2.address, BoxV2);
	  assert.strictEqual(await token2.retrieve());
	});
  });
  */
  
});
