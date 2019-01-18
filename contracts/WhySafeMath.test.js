const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['WhySafeMath'])

describe('WhySafeMath', () => {

  // ----------------------------------------
  // Read this before starting Koan 2.
  // ----------------------------------------

  // ----------------------------------------
  // In Koan 6 we will be introducing the
  // SafeMath library, which allows us to do
  // safer arithmetic with unsigned integers.
  // Doing arithmetic without SafeMath may
  // lead to incorrect calculations in cases
  // where the operation overflows.
  // SafeMath instead reverts the transaction
  // in these cases.
  // Below are some tests that demonstrate
  // these cases.
  // ----------------------------------------

  describe('getMax', () => {
    // ----------------------------------------
    // Firstly we have a function that returns
    // the maximum possible integer value
    // supported by Solidity:
    // ----------------------------------------

    it('should return maximum possible integer', contract('WhySafeMath', async ({ accounts, instance }) => {
      // when ... we get max
      const result = await ContractUtils.call(
        instance.methods.getMax(),
        { from: accounts[0] },
      )
      // then ... should return expected value
      assert.equal(result, 115792089237316195423570985008687907853269984665640564039457584007913129639935)
    }))
  })

  // ----------------------------------------
  // addition
  // ----------------------------------------

  describe('getMaxPlusOne & safeGetMaxPlusOne', () => {
    // ----------------------------------------
    // Next we have a comparison of the two
    // possible approaches to adding 1 to the
    // maximum possible integer:
    // 1. first with getMaxPlusOne, which uses
    //    normal operators, and returns the
    //    incorrect result because of overflow.
    // 2. then with safeGetMaxPlusOne, which
    //    uses the SafeMath add method, instead
    //    reverts the transaction with an error.
    // ----------------------------------------
    it('should return incorrect calculation on overflow', contract('WhySafeMath', async ({ accounts, instance }) => {
      // when ... we add 1 to max
      const result = await ContractUtils.call(
        instance.methods.getMaxPlusOne(),
        { from: accounts[0] },
      )
      // then ... should return expected but incorrect value
      assert.equal(result, 0)
    }))

    it('should revert transaction on SafeMath overflow', contract('WhySafeMath', async ({ accounts, instance }) => {
      // when ... we add 1 to max using SafeMath
      // then ... should revert transaction with expected error message
      await assert.isRejected(
        ContractUtils.call(
          instance.methods.safeGetMaxPlusOne(),
          { from: accounts[0] },
        ),
        Error,
        /Exception while processing transaction: invalid opcode/,
      )
    }))
  })

  // ----------------------------------------
  // subtraction
  // ----------------------------------------

  describe('getMinMinusOne & safeGetMinMinusOne', () => {
    // ----------------------------------------
    // The following demonstrates the same
    // but with subtraction.
    // ----------------------------------------
    it('should return incorrect calculation on overflow', contract('WhySafeMath', async ({ accounts, instance }) => {
      // when ... we subtract 1 from min
      const result = await ContractUtils.call(
        instance.methods.getMinMinusOne(),
        { from: accounts[0] },
      )
      // then ... should return expected but incorrect value
      assert.equal(result, 115792089237316195423570985008687907853269984665640564039457584007913129639935)
    }))

    it('should revert transaction on SafeMath overflow', contract('WhySafeMath', async ({ accounts, instance }) => {
      // when ... we subtract 1 from min
      // then ... should revert transaction with expected error message
      await assert.isRejected(
        ContractUtils.call(
          instance.methods.safeGetMinMinusOne(),
          { from: accounts[0] },
        ),
        Error,
        /Exception while processing transaction: invalid opcode/,
      )
    }))
  })

  // ----------------------------------------
  // multiplication
  // ----------------------------------------

  describe('getHalfMaxTimesTwo & safeGetHalfMaxTimesTwo', () => {
    // ----------------------------------------
    // The following demonstrates the same
    // but with multiplication.
    // ----------------------------------------

    it('should return incorrect calculation on overflow', contract('WhySafeMath', async ({ accounts, instance }) => {
      // when ... we subtract 1 from min
      const result = await ContractUtils.call(
        instance.methods.getHalfMaxTimesTwo(),
        { from: accounts[0] },
      )
      // then ... should return expected but incorrect value
      assert.equal(result, 0)
    }))

    it('should revert transaction on SafeMath overflow', contract('WhySafeMath', async ({ accounts, instance }) => {
      // when ... we subtract 1 from min
      // then ... should revert transaction with expected error message
      await assert.isRejected(
        ContractUtils.call(
          instance.methods.safeGetHalfMaxTimesTwo(),
          { from: accounts[0] },
        ),
        Error,
        /Exception while processing transaction: invalid opcode/,
      )
    }))
  })

  // ---------------------------------------
  // division
  //
  // Solidity handles division safely, so
  // SafeMath.div is just for consistency.
  // ----------------------------------------
})
