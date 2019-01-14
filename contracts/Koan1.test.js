const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')
const parametrize = require('js-parametrize')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['Koan1'])

describe('1. Value Data Types', () => {

  // ----------------------------------------
  // We will be working on the Koan1 contract
  // in this section.
  // ----------------------------------------

  // ----------------------------------------
  // 1.1. create some public properties
  // ----------------------------------------
  //
  // Unskip the 1.1 describe block.
  //
  // Then add the following public properties:
  // - myNumber
  // - myBoolean
  // - myAddress
  // ----------------------------------------

  describe.skip('1.1', () => {
    it('should expose public properties and methods', contract('Koan1', async ({ accounts, instance }) => {
      assert.includeMembers(Object.keys(instance.methods), [
        'myNumber',
        'myBoolean',
        'myAddress',
      ])
    }))
  })

  // ----------------------------------------
  // 1.2. give the public properties some values
  // ----------------------------------------
  //
  // Unskip the 1.2 describe block.
  //
  // Then update those 3 properties to the
  // Solidity equivalents of:
  // - myNumber : int = 12
  // - myBoolean : bool = true
  // - myAddress : address = 0x7647eFCFb1ab2aaB3D799eDaF8fF8520F1183605
  // ----------------------------------------

  describe.skip('1.2', () => {
    parametrize([
      ['myNumber', 12],
      ['myBoolean', true],
      ['myAddress', '0x7647eFCFb1ab2aaB3D799eDaF8fF8520F1183605'],
    ], (property, expected) => {
      it('should return correct values for public constants', contract('Koan1', async ({ accounts, instance }) => {
        // when ... we invoke the provided public property
        const result = await ContractUtils.call(
          instance.methods[ property ](),
          { from: accounts[0] },
        )
        // then ... should return expected value
        assert.equal(result, expected)
      }))
    })
  })

  // ----------------------------------------
  // 1.3. a simple function that interacts
  //      with a property
  // ----------------------------------------
  //
  // Unskip the 1.3 describe block.
  //
  // Then create the following method:
  // - multiplyMyNumber:
  //   Should take a single positive integer
  //   and multiply it by myNumber, and return
  //   the result.
  // ----------------------------------------

  describe.skip('1.3', () => {
    parametrize([
      [1, 12],
      [3, 36],
    ], (n, expected) => {
      it('should return correct multiple of myNumber', contract('Koan1', async ({ accounts, instance }) => {
        // when ... we invoke the provided public property
        const result = await ContractUtils.call(
          instance.methods.multiplyMyNumber(n),
          { from: accounts[0] },
        )
        // then ... should return expected value
        assert.equal(result, expected)
      }))
    })
  })
})
