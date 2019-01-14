pragma solidity ^0.4.24;


contract Koan1 {
  uint8 public myNumber = 12;
  bool public myBoolean = true;
  address public myAddress = 0x7647eFCFb1ab2aaB3D799eDaF8fF8520F1183605;

  function multiplyMyNumber(uint256 n) external view returns (uint256) {
    return myNumber * n;
  }

  function setMyBoolean(bool value) external {
    myBoolean = value;
  }
}
