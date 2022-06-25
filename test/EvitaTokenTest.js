const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('EvitaToken', () => {
  let token;
  let owner;
  let user1;
  const initialSupply = 111;

  beforeEach(async () => {
    const EvitaToken = await ethers.getContractFactory('EvitaToken');
    [owner, user1] = await ethers.getSigners();
    token = await upgrades.deployProxy(EvitaToken, [
      'Evita',
      'EVI',
      initialSupply,
    ]);
  });

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('Should mint total supply', async () => {
      expect(await token.totalSupply()).to.equal(
        ethers.utils.parseEther(`${initialSupply}`)
      );
    });

    it('Should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Minting', () => {
    it('Should mint ether to owner', async () => {
      const etherToMint = 7;
      await token.mint(
        owner.address,
        ethers.utils.parseEther(`${etherToMint}`)
      );
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(
        ethers.utils.parseEther(`${initialSupply + etherToMint}`)
      );
    });
  });

  describe('Sending', () => {
    it('Should send ether from owner to other user', async () => {
      const transferAmount = 8;
      const userInitialBalance = await token.balanceOf(user1.address);
      const ownerInitialBalance = await token.balanceOf(owner.address);
      // This one fails with Error 'ERC20: insufficient allowance'
      await token.transferFrom(
        owner.address,
        user1.address,
        ethers.utils.parseEther(`${transferAmount}`)
      );
      const userFinalBalance = await token.balanceOf(user1.address);
      const ownerFinallBalance = await token.balanceOf(owner.address);
      expect(userFinalBalance).not.equal(userInitialBalance);
      expect(ownerFinallBalance).not.equal(ownerInitialBalance);
    });
  });

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
});
