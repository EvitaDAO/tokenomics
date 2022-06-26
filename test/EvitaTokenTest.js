const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('EvitaToken', () => {
  let token;
  let owner;
  let user1;
  let user2;
  const initialSupply = 111;

  beforeEach(async () => {
    const EvitaToken = await ethers.getContractFactory('EvitaToken');
    [owner, user1, user2] = await ethers.getSigners();
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

  describe('Transactions', () => {
    it('Should transfer tokens between owner and account', async () => {
      const amount = 5;
      const ownerBalance = await token.balanceOf(owner.address);

      await token.transfer(user1.address, amount);

      const newOwnerBalance = await token.balanceOf(owner.address);
      expect(newOwnerBalance).to.equal(ownerBalance.sub(amount));

      const user1Balance = await token.balanceOf(user1.address);
      expect(user1Balance).to.equal(amount);
    });

    it('Should transfer tokens between accounts', async () => {
      const amount = 5;
      await token.transfer(user1.address, amount);
      const user1Balance = await token.balanceOf(user1.address);
      await token.connect(user1).transfer(user2.address, amount);

      const newUser1Balance = await token.balanceOf(user1.address);
      expect(newUser1Balance).to.equal(user1Balance.sub(amount));

      const user2Balance = await token.balanceOf(user2.address);
      expect(user2Balance).to.equal(amount);
    });

    it("Should fail if sender doesn't have enough tokens", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await expect(
        token.connect(user1).transfer(owner.address, 1)
      ).to.be.revertedWith('ERC20: transfer amount exceeds balance');

      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
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
