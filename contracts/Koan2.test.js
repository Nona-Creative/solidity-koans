const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')
const parametrize = require('js-parametrize')
const BigNumber = require('bignumber.js')
const Web3 = require('web3')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['Koan2'])

const MAX = new BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935')

describe('2. Arithmetic & SafeMath', () => {

  // ----------------------------------------
  // Before starting this Koan, have a look
  // at WhySafeMath.sol and read through
  // WhySafeMath.test.js
  // ----------------------------------------

  // ----------------------------------------
  // We will be working on the Koan2 contract
  // in this section.
  // ----------------------------------------

  // ----------------------------------------
  // 2.1. addition
  // ----------------------------------------
  //
  // Unskip the 2.1 describe block.
  //
  // Then add the following method:
  //
  // - sum:
  //   Should take two positive integers
  //   and return their sum.
  //   Should revert transaction on overflow.
  // ----------------------------------------

  describe.skip('2.1', () => {
    parametrize([
      [1, 30, 31],
      [30, 2, 32],
      [MAX.minus(1), 1, MAX.toNumber()],
    ], (a, b, expected) => {
      it('should return the sum of provided arguments', contract('Koan2', async ({ accounts, instance }) => {
        // when ... we sum the 2 provided integers
        // NOTE: Web3 requires us to convert large numbers to hex before passing them as arguments
        const result = await ContractUtils.call(
          instance.methods.sum(Web3.utils.numberToHex(a), Web3.utils.numberToHex(b)),
          { from: accounts[0] },
        )
        // then ... should return expected value
        assert.equal(result, expected)
      }))
    })

    it('should revert transaction on overflow', contract('Koan2', async ({ accounts, instance }) => {
      // when ... we sum maximum possible integer and 1
      // then ... should revert transaction with expected error message
      await assert.isRejected(
        ContractUtils.call(
          instance.methods.sum(Web3.utils.numberToHex(MAX), 1),
          { from: accounts[0] },
        ),
        Error,
        /Exception while processing transaction: invalid opcode/,
      )
    }))
  })

  // ----------------------------------------
  // 2.2. subtraction
  // ----------------------------------------
  //
  // Unskip the 2.2 describe block.
  //
  // Then add the following method:
  //
  // - diff:
  //   Should take two positive integers
  //   and return the diff between them.
  //   Should never overflow.
  // ----------------------------------------

  describe.skip('2.2', () => {
    parametrize([
      [1, 30, 29],
      [30, 2, 28],
      [MAX.minus(1), MAX.minus(2), 1],
    ], (a, b, expected) => {
      it('should return the sum of provided arguments', contract('Koan2', async ({ accounts, instance }) => {
        // when ... we sum the 2 provided integers
        // NOTE: Web3 requires us to convert large numbers to hex before passing them as arguments
        const result = await ContractUtils.call(
          instance.methods.diff(Web3.utils.numberToHex(a), Web3.utils.numberToHex(b)),
          { from: accounts[0] },
        )
        // then ... should return expected value
        assert.equal(result, expected)
      }))
    })
  })

  // ----------------------------------------
  // 2.3. multiplication & division
  //
  // Unskip the 2.3 describe block.
  //
  // Then add the following method:
  //
  // - percentage:
  //   Should take:
  //   - number (uint)
  //   - percentage (uint)
  //   And return the percentage of the number
  //   as a uint eg.
  //   percentage(1000, 20) === 200
  //
  //   NOTE: uints will automatically round down
  // ----------------------------------------

  describe.skip('2.3', () => {
    const JUST_OVER_HALF_MAX = MAX.minus(1).div(2).add(1)
    const JUST_UNDER_HALF_MAX = MAX.minus(1).div(2)
    const MAX_100_PERC_NUMBER = new BigNumber('1157920892373161954235709850086879078532699846656405640394575840079131296399')

    it('sanity check on JUST_OVER_HALF_MAX and JUST_UNDER_HALF_MAX', () => {
      assert.deepEqual(MAX, JUST_OVER_HALF_MAX.mul(2).minus(1))
      assert.deepEqual(MAX, JUST_UNDER_HALF_MAX.mul(2).add(1))
    })

    parametrize([
      [100, 20, 20],
      [3000, 20, 600],
      [5, 50, 2],
      [MAX_100_PERC_NUMBER, 100, MAX_100_PERC_NUMBER.toFixed()],
    ], (number, percentage, expected) => {
      it('should return the expected percentage of number for provided arguments', contract('Koan2', async ({ accounts, instance }) => {
        // when ... we get the 'percentage' of 'number'
        const result = await ContractUtils.call(
          instance.methods.percentage(Web3.utils.numberToHex(number), percentage),
          { from: accounts[0] },
        )
        // then ... should return expected value
        assert.equal(result, expected.toString())
      }))

      it('should revert transaction on overflow', contract('Koan2', async ({ accounts, instance }) => {
        // when ... we sum maximum possible integer and 1
        // then ... should revert transaction with expected error message
        await assert.isRejected(
          ContractUtils.call(
            instance.methods.percentage(Web3.utils.numberToHex(MAX_100_PERC_NUMBER.add(1)), 100),
            { from: accounts[0] },
          ),
          Error,
          /Exception while processing transaction: invalid opcode/,
        )
      }))
    })
  })

  // ----------------------------------------
  // 2.4. powers
  // ----------------------------------------

  // ----------------------------------------
  // 2.5. modulo
  // ----------------------------------------
})
