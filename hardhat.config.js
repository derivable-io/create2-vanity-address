/** @type import('hardhat/config').HardhatUserConfig */
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

require("@nomiclabs/hardhat-ethers");
require("hardhat-contract-sizer");

module.exports = {
    defaultNetwork: 'hardhat',
    solidity: {
        compilers: [
            {
                version: "0.8.13",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 4294967295,
                    },
                },
            },
        ]
    },
    networks: {
        hardhat: {
            accounts: [
                {
                    privateKey: "0x28d1bfbbafe9d1d4f5a11c3c16ab6bf9084de48d99fbac4058bdfa3c80b2908c",
                    balance: "900000000000000000000000000000000000",
                },
                {
                    privateKey: '0x28d1bfbbafe9d1d4f5a11c3c16ab6bf9084de48d99fbac4058bdfa3c80b2908d',
                    balance: "900000000000000000000000000000000000",
                },
                {
                    privateKey: '0x0000000000000000000000000000000000000000000000000000000000000001',
                    balance: "1000000000000000000000000",
                },
            ]
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            accounts: [
                process.env.LOCAL_DEPLOYER ?? '0x28d1bfbbafe9d1d4f5a11c3c16ab6bf9084de48d99fbac4058bdfa3c80b2908c',
                '0x0000000000000000000000000000000000000000000000000000000000000001'
            ]
        }
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
        only: [],
    }
};
