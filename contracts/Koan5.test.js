const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')
const R = require('ramda')
const Bluebird = require('bluebird')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['Koan5'])

describe('5. Structs & Events', () => {

  // ----------------------------------------
  // We will be working on the Koan5 contract
  // in this section.
  // ----------------------------------------

  // ----------------------------------------
  // 5.1. struct arrays and tuples
  // ----------------------------------------
  //
  // Unskip the 5.1 describe block.
  //
  // Add the following struct:
  // - Coord
  //   - _x (int)
  //   - _y (int)
  //   - _label (string)
  // Add the following private property:
  // - _coords (array of Coord)
  // And add the following public methods:
  // - appendCoord
  //   Should take 3 arguments:
  //   - _x (int)
  //   - _y (int)
  //   - _label (string)
  //   And append a new Coord with those
  //   values to _coords.
  // - getCoordAt
  //   - i (uint)
  //   Should return the coordinates and
  //   label at the provided index.
  // ----------------------------------------

  describe.skip('5.1', () => {
    it('should not expose private properties', contract('Koan5', async ({ accounts, instance }) => {
      assert.notIncludeMembers(Object.keys(instance.methods), [
        '_coords',
      ])
    }))

    describe('appendCoord / getCoordAt', () => {
      it('should append coords to array and return those at the requested index', contract('Koan5', async ({ accounts, instance }) => {
        // given ... a few coords
        const path = [
          [513, -633, 'home'],
          [-34543, 34252, 'shops'],
          [53, 0, 'work'],
        ]
        await Bluebird
          .mapSeries(path, x => (
            ContractUtils.send(
              instance.methods.appendCoord(...x),
              { from: accounts[0] },
              true,
            )
          ))

        // when ... we retrieve the coords and label for each step in path
        // then ... should return the expected result
        const result = await Bluebird
          .mapSeries(path, (x, i) => (
            ContractUtils.call(
              instance.methods.getCoordAt(i),
              { from: accounts[0] },
            )
          ))
        const resultValues = R.map(R.values, result)
        const expected = R.map(R.map(x => x.toString()), path)
        assert.deepEqual(resultValues, expected)
      }))
    })
  })

  // ----------------------------------------
  // 5.2. events and msg object
  // ----------------------------------------
  //
  // Unskip the 5.2 describe block.
  //
  // Add the following event:
  // - GotMoney
  //   - _from (address)
  //   - _amount (uint)
  //   - _timestamp (uint)
  // And add the following public method:
  // - takeSomeMoney
  //   Should take no arguments, but should
  //   accept Ether.
  //   And should dispatch a GotMoney event,
  //   with the address that called it, and
  //   the amount of Ether sent (in Wei).
  // ----------------------------------------

  describe.skip('5.2', () => {
    describe('createMember / getMember', () => {
      it('should dispatch expected event with expected values', contract('Koan5', async ({ accounts, instance }) => {
        // when ... we send 100 wei to takeSomeMoney as account 2
        const tx = await ContractUtils.send(
          instance.methods.takeSomeMoney(),
          { from: accounts[2], value: 100 },
          true,
        )

        // then ... should dispatch expected event once with expected values
        const GotMoneyEvents = ContractUtils.events('GotMoney', tx)
        assert.equal(GotMoneyEvents.length, 1)
        assert.equal(GotMoneyEvents[0]._from.toLowerCase(), accounts[2])
        assert.equal(GotMoneyEvents[0]._amount, 100)
      }))
    })
  })

  // ----------------------------------------
  // 5.3. struct mappings
  // ----------------------------------------
  //
  // Unskip the 5.3 describe block.
  //
  // Add the following event:
  // - MemberCreated
  //   - _id (uint)
  //   - _name (string)
  //   - _address (address)
  // Add the following struct:
  // - Member
  //   - _name (string)
  //   - _address (address)
  // Add the following private properties:
  // - _lastMemberId (uint)
  // - _memberFlights (mapping of uint to
  //    Member)
  // And add the following public methods:
  // - createMember
  //   Should take 2 arguments:
  //   - name (string)
  //   - memberAddress (address)
  //   And create a new Member record in
  //   _members with those values using an
  //   auto-incremented id as the mapping key.
  // - getMember
  //   - id (uint)
  //   And return the member data for a member
  //   with that id.
  // ----------------------------------------

  describe.skip('5.3', () => {
    it('should not expose private properties', contract('Koan5', async ({ accounts, instance }) => {
      assert.notIncludeMembers(Object.keys(instance.methods), [
        '_members',
        '_lastMemberId',
      ])
    }))

    describe('createMember / getMember', () => {
      it('should create member as expected and get member by id', contract('Koan5', async ({ accounts, instance }) => {
        // when ... we create members for accounts 0, 1 & 2
        const data = [
          ['Kaitlyn Koan', accounts[2]],
          ['Kelvin Koan', accounts[1]],
          ['K3PO Koan', accounts[0]],
        ]
        const txs = await Bluebird
          .mapSeries(data, x => (
            ContractUtils.send(
              instance.methods.createMember(...x),
              { from: accounts[0] },
              true,
            )
          ))

        // then ... should dispatch single event per tx, with expected values, including member's id
        const MemberCreatedEvents = R.map(tx => ContractUtils.events('MemberCreated', tx), txs)
        assert.equal(MemberCreatedEvents[0].length, 1)
        assert.equal(MemberCreatedEvents[0][0]._id, '1')
        assert.equal(MemberCreatedEvents[0][0]._name, 'Kaitlyn Koan')
        assert.equal(MemberCreatedEvents[0][0]._address.toLowerCase(), accounts[2])
        assert.equal(MemberCreatedEvents[1].length, 1)
        assert.equal(MemberCreatedEvents[1][0]._id, '2')
        assert.equal(MemberCreatedEvents[1][0]._name, 'Kelvin Koan')
        assert.equal(MemberCreatedEvents[1][0]._address.toLowerCase(), accounts[1])
        assert.equal(MemberCreatedEvents[2][0]._id, '3')
        assert.equal(MemberCreatedEvents[2][0]._name, 'K3PO Koan')
        assert.equal(MemberCreatedEvents[2][0]._address.toLowerCase(), accounts[0])

        // when ... we retrieve each newly created member using the returned ids
        const newMemberIds = R.map(R.compose(parseInt, R.prop('_id'), R.head), MemberCreatedEvents)
        const results = await Bluebird
          .mapSeries(newMemberIds, x => (
            ContractUtils.call(
              instance.methods.getMember(x),
              { from: accounts[0] },
            )
          ))

        // then ... should return expected members
        assert.equal(results[0][0], 'Kaitlyn Koan')
        assert.equal(results[0][1].toLowerCase(), accounts[2])
        assert.equal(results[1][0], 'Kelvin Koan')
        assert.equal(results[1][1].toLowerCase(), accounts[1])
        assert.equal(results[2][0], 'K3PO Koan')
        assert.equal(results[2][1].toLowerCase(), accounts[0])
      }))
    })
  })
})
