pragma solidity ^0.4.24;


contract Koan6 {
  uint256 public _latestSumResult = 0;

  function freakOutOverNothing() external pure {
    revert('oh no');
  }

  function freakOutOver10(uint256 n) external pure returns (string) {
    require(n <= 10, 'oh no');
    return 'OK';
  }

  function freakOutAfterSumOver10(uint256 a, uint256 b) external returns (uint256) {
    _latestSumResult = a + b;
    assert(_latestSumResult <= 10);
  }
}
