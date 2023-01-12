const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const expect = chai.expect;
const { ethers } = require("hardhat");

describe("Check bytecode of UTR address", function () {
    it("Compare bytecode offchain/onchain", async function () {
        const [owner] = await ethers.getSigners();
        const signer = owner;
        const bytecodeOffchain = require('@derivable/utr/build/UniversalTokenRouter.json').deployedBytecode;
        const bytecodeOnchain = await signer.provider.getCode('0x88887699Cc5475969B5c9B42412309AFAAE73576');
        await expect(bytecodeOnchain).to.equal(bytecodeOffchain);
    });
});