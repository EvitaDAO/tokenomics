const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('EvitaToken', function () {
  let token;
  let owner;
  let user1;
  const initialSupply = 111;

  beforeEach(async function () {
    const EvitaToken = await ethers.getContractFactory('EvitaToken');
    [owner, user1] = await ethers.getSigners();
    token = await upgrades.deployProxy(EvitaToken, [
      'Evita',
      'EVI',
      initialSupply,
    ]);
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('Should mint total supply', async function () {
      expect(await token.totalSupply()).to.equal(
        ethers.utils.parseEther(`${initialSupply}`)
      );
    });

    it('Should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Burning', function () {
    it('Should burn owner tokens', async function () {
      const etherToBurn = 5;
      await token.burn(ethers.utils.parseEther(`${etherToBurn}`));
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(
        ethers.utils.parseEther(`${initialSupply - etherToBurn}`)
      );
    });

    it('Should burn user tokens', async function () {
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
