const { ethers } = require("hardhat")
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))

// Singleton Factory contract address of EIP-2470
const deployerAddress = '0xce0042B868300000d44A59004Da54A005ffdcf9f'

const yield = () => new Promise(res => setTimeout(res, 0))

function found(address) {
    return address.startsWith('0x6120') && address.endsWith('6120')
    // // const re = new RegExp('^(....).*\1$')
    // const re = new RegExp('^8888.*')
    // return re.test(address.substring(2, address.length))
}

async function scan(initCodeHash, salt = 0, offset = 1, checkpoint = 1000000) {
    console.log('initCodeHash:', initCodeHash, 'offset:', offset, 'checkpoint:', checkpoint)
    while(true) {
        console.log('salt:', salt)
        await yield()
        for (let i = 0; i < checkpoint; ++i) {
            const address = ethers.utils.getCreate2Address(
                deployerAddress,
                ethers.utils.hexZeroPad(ethers.utils.hexlify(salt), 32),
                initCodeHash,
            )
            if (found(address)) {
                console.log('salt:', salt, ethers.utils.hexZeroPad(ethers.utils.hexlify(salt), 32))
                console.log('address:', address)
                return
            }
            salt += offset
        }
    }
}

process.on("SIGINT", function () {
    // remove incomplete output files because user interrupted the script with CTRL+C
    // console.log(`salt processing: ${salt} \r`)
    process.exit(1)
})

async function main() {
    const initCode = JSON.parse(fs.readFileSync(argv.b)).bytecode
    const initCodeHash = ethers.utils.keccak256(initCode)
    scan(initCodeHash, argv.s, argv.o, argv.c)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
});