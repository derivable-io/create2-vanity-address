const { ethers } = require("hardhat");


function hasVanityAddress(address = '0x0000') {
    const re = new RegExp('0x6120.*6120');
    return re.test(address);
}
function getSaltForVanityAddress(deployerAddress, initCodeHash) {
    let salt = 0;
    let vanityAddress = '';
    let saltHash;
    while (!hasVanityAddress(vanityAddress)) {
        salt += 1;
        saltHash = ethers.utils.keccak256(salt);
        vanityAddress = ethers.utils.getCreate2Address(
            deployerAddress,
            saltHash,
            initCodeHash,
        );
    }
    console.log(`saltHash: ${saltHash}`);
    console.log(`vanityAddress: ${vanityAddress}`);
    return saltHash;
}
async function main() {
    const UTR = await ethers.getContractFactory('UniversalTokenRouter');
    const Factory = await ethers.getContractFactory("UTRFactory");
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log(`UTRFactory: ${factory.address}`);
    const { data: initCode } = UTR.getDeployTransaction();
    const initCodeHash = ethers.utils.keccak256(initCode);
    const saltHash = getSaltForVanityAddress(factory.address, initCodeHash);

    // const deployTx = await factory.createUTR(saltHash);
    // const txReceipt = await deployTx.wait();
    // const deployEvent = txReceipt.events.find(
    //   (event) => event.event === 'Deploy',
    // );
    // console.log(deployEvent.args.addr);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});