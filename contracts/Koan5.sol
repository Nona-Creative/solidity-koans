pragma solidity ^0.4.24;


contract Koan5 {
  struct Coord {
    int256 _x;
    int256 _y;
    string _label;
  }
  struct Member {
    string _name;
    address _address;
  }
  event GotMoney(address _from, uint256 _amount);
  event MemberCreated(uint256 _id, string _name, address _address);

  Coord[] private _coords;
  mapping (uint256 => Member) private _members;
  uint256 _lastMemberId = 0;

  function appendCoord(int256 x, int256 y, string label) external {
    _coords.push(Coord(x, y, label));
  }

  function getCoordAt(uint256 i) external view returns (int256, int256, string) {
    return (_coords[i]._x, _coords[i]._y, _coords[i]._label);
  }

  function takeSomeMoney() external payable {
    emit GotMoney(msg.sender, msg.value);
  }

  function createMember(string name, address memberAddress) external {
    _lastMemberId++;
    uint256 id = _lastMemberId;
    _members[id] = Member(name, memberAddress);
    emit MemberCreated(_lastMemberId, name, memberAddress);
  }

  function getMember(uint256 id) external view returns (string, address) {
    return (_members[id]._name, _members[id]._address);
  }
}
