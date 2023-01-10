// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@derivable/utr/contracts/UniversalTokenRouter.sol";

contract UTRFactory {
    event Deploy(address addr);

    function createUTR(bytes32 saltHash) external
        returns (address addr)
    {
        bytes memory _bytecode = abi.encodePacked(
            type(UniversalTokenRouter).creationCode
        );
        addr = Create2.deploy(0, saltHash, _bytecode);
        emit Deploy(addr);
        return addr;
    }
}