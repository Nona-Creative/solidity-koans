const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')
const parametrize = require('js-parametrize')
const R = require('ramda')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['Koan3'])

describe('3. Storage Data Types : Arrays', () => {

  // ----------------------------------------
  // We will be working on the Koan3 contract
  // in this section.
  // ----------------------------------------

  // ----------------------------------------
  // This section introduces some more
  // "advanced" problems, which are marked with
  // an *. Skip them in order to get through
  // all the Koans, and then come back to them
  // if you have time or as homework if you
  // are so inclined :).
  // ----------------------------------------

  // ----------------------------------------
  // 3.1. create getter and setter for array
  // ----------------------------------------
  //
  // Unskip the 3.1 describe block.
  //
  // Add the following private property:
  // - _xs
  // Add the following public methods:
  // - setXs
  //   Set the value of _xs
  // - getXs
  //   Returns the value of _xs
  // ----------------------------------------

  describe.skip('3.1', () => {
    it('should not expose private properties', contract('Koan3', async ({ accounts, instance }) => {
      assert.notIncludeMembers(Object.keys(instance.methods), [
        '_xs',
      ])
    }))

    describe('setXs / getXs', () => {
      it('should set and get _xs as expected', contract('Koan3', async ({ accounts, instance }) => {
        // when ... we set and then get _xs
        await ContractUtils.send(
          instance.methods.setXs([1, 2, 3, 4]),
          { from: accounts[0] },
          true,
        )
        const result = await ContractUtils.call(
          instance.methods.getXs(),
          { from: accounts[0] },
          true,
        )

        // then ... should return expected value
        assert.deepEqual(result, ['1', '2', '3', '4'])
      }))
    })
  })

  // ----------------------------------------
  // 3.2. update array
  // ----------------------------------------
  //
  // Unskip the 3.2 describe block.
  //
  // Add the following public method:
  // - appendX
  //   Should take a uint and add it to _xs.
  // ----------------------------------------

  describe.skip('3.2', () => {
    describe('appendX', () => {
      it('should add to _xs array as expected', contract('Koan3', async ({ accounts, instance }) => {
        // given ... _xs has a predictable value
        await ContractUtils.send(
          instance.methods.setXs([1, 2, 3, 4]),
          { from: accounts[0] },
          true,
        )

        // when ... we append 5 to it
        await ContractUtils.send(
          instance.methods.appendX(5),
          { from: accounts[0] },
          true,
        )

        // then ... should have appended as expected
        const result = await ContractUtils.call(
          instance.methods.getXs(),
          { from: accounts[0] },
          true,
        )
        assert.deepEqual(result, ['1', '2', '3', '4', '5'])
      }))
    })
  })

  // ----------------------------------------
  // 3.3. introducing a loop
  // ----------------------------------------
  //
  // Unskip the 3.3 describe block.
  //
  // Add the following public method:
  // - sumXs
  //   Should return the sum of all the values
  //   in _xs.
  // ----------------------------------------

  describe.skip('3.3', () => {
    describe('sumXs', () => {
      parametrize([
        [[0, 1, 2, 3, 4, 5], 15],
        [[1, 3, 2, 10], 16],
        [[], 0],
      ], (xs, expected) => {
        it('should sum the values in _xs as expected', contract('Koan3', async ({ accounts, instance }) => {
          // given ... _xs has a predictable value
          await ContractUtils.send(
            instance.methods.setXs(xs),
            { from: accounts[0] },
            true,
          )

          // when ... we sum it's values
          const result = await ContractUtils.call(
            instance.methods.sumXs(),
            { from: accounts[0] },
            true,
          )

          // then ... should return the expected sum
          assert.deepEqual(result, expected.toString())
        }))
      })
    })
  })

  // ----------------------------------------
  // 3.4. array arguments and pure functions
  // ----------------------------------------
  //
  // Unskip the 3.4 describe block.
  //
  // Add the following public method:
  // - countEvenXs
  //   Should take an array of uints, and
  //   return the number of even numbers in
  //   the provided array.
  // ----------------------------------------

  describe.skip('3.4', () => {
    describe('countEvenXs', () => {
      parametrize([
        [[0, 1, 2, 3, 4, 5, 6], 4],
        [[1, 3, 5, 6], 1],
        [[1, 3, 5, 7], 0],
      ], (xs, expected) => {
        it('should count the evens numbers in _xs', contract('Koan3', async ({ accounts, instance }) => {
          // given ... _xs has a predictable value
          await ContractUtils.send(
            instance.methods.setXs(xs),
            { from: accounts[0] },
            true,
          )

          // when ... we count the evens numbers in _xs
          const result = await ContractUtils.call(
            instance.methods.countEvenXs(xs),
            { from: accounts[0] },
            true,
          )

          // then ... should return the expected result
          assert.deepEqual(result, expected.toString())
        }))
      })
    })
  })

  // ----------------------------------------
  // 3.5. manipulating an array *
  // ----------------------------------------
  //
  // Unskip the 3.5 describe block.
  //
  // Add the following public method:
  // - removeXAt
  //   Should take an index (uint) and remove
  //   the item at position from _xs.
  //   Should not leave a gap at that position
  //   and the length of _xs after removeXAt
  //   should be one shorter.
  // ----------------------------------------

  describe.skip('3.5', () => {
    describe('removeXAt', () => {
      parametrize([
        [[1, 2, 3, 4, 5], 2, [1, 2, 4, 5]],
        [[1, 2, 3, 4, 5], 0, [2, 3, 4, 5]],
        [[1, 2, 3, 4, 5], 4, [1, 2, 3, 4]],
        [[123], 0, []],
      ], (before, index, after) => {
        it('should remove the value from target index without leaving a gap', contract('Koan3', async ({ accounts, instance }) => {
          // given ... _xs has a predictable value
          await ContractUtils.send(
            instance.methods.setXs(before),
            { from: accounts[0] },
            true,
          )

          // when ... we remove the item at the provided index
          await ContractUtils.send(
            instance.methods.removeXAt(index),
            { from: accounts[0] },
            true,
          )

          // then ... should remove the value from target index without leaving a gap
          const result = await ContractUtils.call(
            instance.methods.getXs(),
            { from: accounts[0] },
            true,
          )
          assert.deepEqual(result, R.map(R.toString, after))
        }))
      })
    })
  })

  // ----------------------------------------
  // 3.6. building a new array *
  // ----------------------------------------
  //
  // Unskip the 3.6 describe block.
  //
  // Add the following public method:
  // - getEvenXs
  //   Should return a new array containing
  //   all the even numbers from _xs.
  // ----------------------------------------

  describe.skip('3.6', () => {
    describe('getEvenXs', () => {
      parametrize([
        [[0, 1, 2, 3, 4, 5, 6], [0, 2, 4, 6]],
        [[1, 3, 5, 6], [6]],
        [[1, 3, 5, 7], []],
      ], (value, expected) => {
        it('should return all the even numbers from _xs', contract('Koan3', async ({ accounts, instance }) => {
          // given ... _xs has a predictable value
          await ContractUtils.send(
            instance.methods.setXs(value),
            { from: accounts[0] },
            true,
          )

          // when ... we get all the even numbers from _xs
          const result = await ContractUtils.call(
            instance.methods.getEvenXs(),
            { from: accounts[0] },
            true,
          )

          // then ... should return the expected array
          assert.deepEqual(result, R.map(R.toString, expected))
        }))
      })
    })
  })
})
