const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("EvitaToken", function () {
  let token;

  beforeEach(async function () {
    const EvitaToken = await hre.ethers.getContractFactory("EvitaToken");
    token = await EvitaToken.deploy(111);
    await token.deployed();
  });

  it("Should mint total supply", async function () {
    expect(await token.totalSupply()).to.equal(ethers.utils.parseEther("111"));
  });

  it("Should burn tokens", async function () {
    token.burn(ethers.utils.parseEther("1"));
    expect(await token.totalSupply()).to.equal(ethers.utils.parseEther("110"));
  });
});
