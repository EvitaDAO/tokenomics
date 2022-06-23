const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EvitaToken", function () {
  let token;
  let owner;
  let user1;

  beforeEach(async function () {
    const EvitaToken = await ethers.getContractFactory("EvitaToken");
    [owner, user1] = await ethers.getSigners();
    token = await EvitaToken.deploy(111);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should mint total supply", async function () {
      expect(await token.totalSupply()).to.equal(
        ethers.utils.parseEther("111")
      );
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Burning", function () {
    it("Should burn owner tokens", async function () {
      await token.burn(ethers.utils.parseEther("1"));
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.utils.parseEther("110"));
      expect(await token.totalSupply()).to.equal(
        ethers.utils.parseEther("110")
      );
    });

    it("Should burn user tokens", async function () {
      await token.transfer(user1.address, ethers.utils.parseEther("5"));
      await token.connect(user1).burn(ethers.utils.parseEther("1"));
      const userBalance = await token.balanceOf(user1.address);
      expect(userBalance).to.equal(ethers.utils.parseEther("4"));
      expect(await token.totalSupply()).to.equal(
        ethers.utils.parseEther("110")
      );
    });
  });
});
