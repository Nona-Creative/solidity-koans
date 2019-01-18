pragma solidity ^0.4.24;

import "./common/libs/SafeMath.sol";


contract Koan4 {
  using SafeMath for uint256;

  mapping (address => uint256) private _memberBalances;

  function setMemberBalance(address member, uint256 value) external {
    _memberBalances[member] = value;
  }

  function getMemberBalance(address member) external view returns (uint256) {
    return _memberBalances[member];
  }
}
