pragma solidity ^0.4.24;

import "./common/libs/SafeMath.sol";


contract Koan2 {
  using SafeMath for uint256;

  function sum(uint256 a, uint256 b) external pure returns (uint256) {
    return a.add(b);
  }

  function diff(uint256 a, uint256 b) external pure returns (uint256) {
    if (a > b) {
      return a.sub(b);
    }
    return b.sub(a);
  }

  function percentage(uint256 num, uint256 per) external pure returns (uint256) {
    return num.mul(per).div(100);
//    return (num * per) / 100; // will fail "should revert transaction on overflow"
  }
}
