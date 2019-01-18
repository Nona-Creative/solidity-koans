const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')
const R = require('ramda')
const Bluebird = require('bluebird')
const parametrize = require('js-parametrize')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['Koan6'])

describe('6. Reverts and modifiers', () => {

  // ----------------------------------------
  // We will be working on the Koan6 contract
  // in this section.
  // ----------------------------------------

  // ----------------------------------------
  // 6.1. revert
  // ----------------------------------------
  //
  // Unskip the 6.1 describe block.
  //
  // Add the following public method:
  // - freakOutOverNothing
  //   Should take no arguments and
  //   immediately revert transaction.
  // ----------------------------------------

  describe('6.1', () => {
    describe('freakOutOverNothing', () => {
      it('should always immediately revert transaction', contract('Koan6', async ({ accounts, instance }) => {
        await assert.isRejected(
          ContractUtils.send(
            instance.methods.freakOutOverNothing(),
            { from: accounts[0] },
            true,
          ),
          Error,
          /revert oh no/,
        )
      }))
    })
  })

  // ----------------------------------------
  // 6.2. require
  // ----------------------------------------
  //
  // Unskip the 6.2 describe block.
  //
  // Add the following public method:
  // - freakOutOver10
  //   Should take a single uint argument and
  //   revert transaction with message "oh no"
  //   if it is greater than 10.
  // ----------------------------------------

  describe('6.2', () => {
    describe('freakOutOver10', () => {
      it('should revert transaction if provided value is greater than 10', contract('Koan6', async ({ accounts, instance }) => {
        await assert.isRejected(
          ContractUtils.send(
            instance.methods.freakOutOver10(123),
            { from: accounts[0] },
            true,
          ),
          Error,
          /revert oh no/,
        )
      }))

      parametrize([
        [0],
        [5],
        [10],
      ], (n) => {
        it('should succeed if provided value is less than 10', contract('Koan6', async ({ accounts, instance }) => {
          const tx = await ContractUtils.send(
            instance.methods.freakOutOver10(n),
            { from: accounts[0] },
            true,
          )
          assert.isTrue(tx.status)
        }))
      })
    })
  })

  // ----------------------------------------
  // 6.3. require
  // ----------------------------------------
  //
  // Unskip the 6.3 describe block.
  //
  // Add the following public method:
  // - _latestSumResult
  // Add the following public method:
  // - freakOutAfterSumOver10
  //   Should take two uint arguments and
  //   update _latestSumResult with their
  //   sum.
  //   But should revert the with transaction
  //   invalid opcode if their sum is change
  //   to _latestSumResult resulted in a value
  //   greater than 10.
  // ----------------------------------------

  describe('6.3', () => {
    describe('freakOutAfterSumOver10', () => {
      it('should revert transaction with invalid opcode if sum of provided values is greater than 10', contract('Koan6', async ({ accounts, instance }) => {
        await assert.isRejected(
          ContractUtils.send(
            instance.methods.freakOutAfterSumOver10(9, 2),
            { from: accounts[0] },
            true,
          ),
          Error,
          /invalid opcode/,
        )
      }))

      parametrize([
        [0, 0, 0],
        [5, 4, 9],
        [4, 5, 9],
      ], (x, y, expected) => {
        it('should succeed if provided value is less than 10', contract('Koan6', async ({ accounts, instance }) => {
          await ContractUtils.send(
            instance.methods.freakOutAfterSumOver10(x, y),
            { from: accounts[0] },
            true,
          )
          const result = await ContractUtils.call(
            instance.methods._latestSumResult(),
            { from: accounts[0] },
          )
          assert.equal(result, expected)
        }))
      })
    })
  })

  // ----------------------------------------
  // 6.4. modifiers
  // ----------------------------------------
  //
  // Unskip the 6.4 describe block.
  //
  // ...
  // ----------------------------------------

  describe('6.4', () => {
    describe('...', () => {
      it('should ...', contract('Koan6', async ({ accounts, instance }) => {
        // TODO: add
      }))
    })
  })
})
