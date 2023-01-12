const { ethers } = require("hardhat");

function hasVanityAddress(address = '0x0000') {
    const re = new RegExp('^(....).*\1$');
    // const re = new RegExp('^8888.*');
    return re.test(address.substring(2, address.length));
}
function getSaltForVanityAddress(initCodeHash) {
    const deployerAddress = '0xce0042B868300000d44A59004Da54A005ffdcf9f';
    let salt = 0;
    let vanityAddress = '';
    let saltHash;
    while(true) {
        salt += 1;
        saltHash = ethers.utils.keccak256(salt);
        vanityAddress = ethers.utils.getCreate2Address(
            deployerAddress,
            saltHash,
            initCodeHash,
        );
        if (hasVanityAddress(vanityAddress))
            console.log(`salt: ${salt} | addr: ${vanityAddress}`);
    }
}
async function main() {
    const bytecodeUTR = require('@derivable/utr/build/UniversalTokenRouter.json').bytecode;
    const initCodeHash = ethers.utils.keccak256(bytecodeUTR);
    getSaltForVanityAddress(initCodeHash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});