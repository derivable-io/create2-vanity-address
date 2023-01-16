const { ethers } = require("hardhat");
const argv = require('minimist')(process.argv.slice(2));

let saltProcessing = 0;

const pause = () => new Promise(res => setTimeout(res, 0));

function hasVanityAddress(address = '0x0000') {
    // const re = new RegExp('^(....).*\1$');
    const re = new RegExp('^8888.*');
    return re.test(address.substring(2, address.length));
}

async function getSaltForVanityAddress(initCodeHash, salt = 0) {
    saltProcessing = salt;
    // Singleton Factory contract address of EIP-2470
    const deployerAddress = '0xce0042B868300000d44A59004Da54A005ffdcf9f';
    let vanityAddress = '';
    let saltHash;
    while(true) {
        // Your program
        saltProcessing += 1;
        saltHash = ethers.utils.keccak256(saltProcessing);
        vanityAddress = ethers.utils.getCreate2Address(
            deployerAddress,
            saltHash,
            initCodeHash,
        );
        // process.stdout.write(`salt: ${saltProcessing} \r`);
        if (hasVanityAddress(vanityAddress))
            console.log(`salt: ${saltProcessing} | addr: ${vanityAddress}`);
        await pause();
    }
}

process.on("SIGINT", function () {
    // remove incomplete output files because user interrupted the script with CTRL+C
    console.log(`salt processing: ${saltProcessing} \r`);
    process.exit(1);
});

async function main() {
    const initCode = require(`./build/${argv.b}.json`).bytecode;
    const initCodeHash = ethers.utils.keccak256(initCode);
    const salt = argv.s;
    getSaltForVanityAddress(initCodeHash, salt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});