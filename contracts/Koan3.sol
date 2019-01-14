pragma solidity ^0.4.24;


contract Koan3 {
  uint256[] private _xs;

  function get() external view returns (uint256[]) {
    return _xs;
  }

  function set(uint256[] xs) external {
    _xs = xs;
  }

  function append(uint256 x) external {
    _xs.push(x);
  }

  function sum() external view returns (uint256 result) {
    for (uint i = 0; i < _xs.length; i++) {
      result += _xs[i];
    }
    return result;
  }

  function removeAt(uint256 idx) external {
    for (uint256 i = idx; i < _xs.length - 1; i++) {
      _xs[i] = _xs[i + 1];
    }
    _xs.length--;
  }

  function getEvens() external view returns (uint256[]) {
    uint256[] memory xs = new uint256[](countEvens(_xs));
    uint256 counter = 0;
    for (uint256 i = 0; i < _xs.length; i++) {
      if (_xs[i] % 2 == 0) {
        xs[counter] = _xs[i];
        counter++;
      }
    }
    return xs;
  }

  function countEvens(uint256[] xs) public pure returns (uint256 counter) {
    for (uint i = 0; i < xs.length; i++) {
      if (xs[i] % 2 == 0) {
        counter++;
      }
    }
    return counter;
  }
}
