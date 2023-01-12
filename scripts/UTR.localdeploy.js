const { ethers } = require("hardhat");

const opts = {
    gasLimit: 30000000
};

async function main() {
    const [owner] = await ethers.getSigners();
    const signer = owner;

    // Setup to deploy UTR
    // const url = "https://bsc-dataseed.binance.org/"
    const singletonFactoryAddress = '0xce0042B868300000d44A59004Da54A005ffdcf9f';
    const singletonFactoryABI = require('./abi/SingletonFactory.json');
    const singletonFactory = new ethers.Contract(singletonFactoryAddress, singletonFactoryABI, owner.provider);
    const initCodeUTR = require('@derivable/utr/build/UniversalTokenRouter.json').bytecode;
    const salt = 71302;
    // 0x46813c3ad3ccf666bcd988ce34c98823d067cd15e337d30d2ac76a189b112553
    const saltHash = ethers.utils.keccak256(salt);
    console.log(saltHash);
    try {
        const tx = await singletonFactory.connect(signer).deploy(initCodeUTR, saltHash, opts);
        console.log(tx);
    } catch (error) {
        console.log("Error: ", error)
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});