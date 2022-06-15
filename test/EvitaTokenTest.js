const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("EvitaToken", function () {
  it("Should test something", async function () {
    const EvitaToken = await hre.ethers.getContractFactory("EvitaToken");
    const token = await EvitaToken.deploy(111);

    await token.deployed();

    expect(await token.totalSupply()).to.equal(ethers.utils.parseEther('111'));
  });
});
