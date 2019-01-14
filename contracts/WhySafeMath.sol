pragma solidity ^0.4.24;

import "./common/libs/SafeMath.sol";


contract WhySafeMath {

  using SafeMath for uint256;

  function getMaxPlusOne() external pure returns (uint256) {
    return getMax() + 1;
  }

  function safeGetMaxPlusOne() external pure returns (uint256) {
    return getMax().add(1);
  }

  function getMinMinusOne() external pure returns (uint256) {
    uint256 min = 0;
    return min - 1;
  }

  function safeGetMinMinusOne() external pure returns (uint256) {
    uint256 min = 0;
    return min.sub(1);
  }

  function getHalfMaxTimesTwo() external pure returns (uint256) {
    uint256 halfMaxPlusOne = getMax() / 2 + 1;
    return halfMaxPlusOne * 2;
  }

  function safeGetHalfMaxTimesTwo() external pure returns (uint256) {
    uint256 halfMaxPlusOne = getMax() / 2 + 1;
    return halfMaxPlusOne.mul(2);
  }

  function getMax() public pure returns (uint256) {
    uint256 max = 2**256 - 1;
    return max;
  }
}
