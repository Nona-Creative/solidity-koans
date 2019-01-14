pragma solidity ^0.4.24;


contract Koan7 {
  string public name = "Koan Seven";
  bytes public firstName = "Kelvin";
  bytes public lastName = "Koan";
  string private _secretString;
  bytes32 private _secretBytes32;
  string private _cardNumber = "123 456 789";

  function setSecretString(string value) external {
    _secretString = value;
  }

  function getSecretString() external view returns (string) {
    return _secretString;
  }

  function setSecretBytes32(bytes32 value) external {
    _secretBytes32 = value;
  }

  function getSecretBytes32() external view returns (bytes32) {
    return _secretBytes32;
  }

  function getNameAsBytes() external view returns (bytes) {
    bytes memory result = bytes(name);
    result[0] = "X";
    return result;
  }

  function getCardNumber() external view returns (bytes) {
    bytes memory _cardNumberBytes = bytes(_cardNumber);
    bytes memory result = new bytes(_cardNumberBytes.length);
    for (uint256 i = 0; i<_cardNumberBytes.length; i++) {
      if (_cardNumberBytes[i] == " ") {
        result[i] = " ";
        continue;
      }
      if (i < 4) {
        result[i] = _cardNumberBytes[i];
        continue;
      }
      result[i] = "x";
    }
    return result;
  }

  function getFullName() external view returns (bytes) {
    uint256 totalLength = firstName.length + lastName.length + 1;
    bytes memory result = new bytes(totalLength);
    for (uint256 i = 0; i<totalLength; i++) {
      if (i < firstName.length) {
        result[i] = firstName[i];
        continue;
      }
      if (i == firstName.length) {
        result[i] = " ";
        continue;
      }
      if (i > firstName.length) {
        result[i] = lastName[i - (firstName.length + 1)];
        continue;
      }
    }
    return result;
  }
}
