const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['Koan4'])

describe('4. Storage Data Types : Mappings', () => {

  // ----------------------------------------
  // We will be working on the Koan4 contract
  // in this section.
  // ----------------------------------------

  // ----------------------------------------
  // 4.1. create getter and setter for mapping
  // ----------------------------------------
  //
  // Unskip the 4.1 describe block.
  //
  // Add the following private property:
  // - _memberBalances (a mapping from an
  //   address to an uint)
  // Add the following public methods:
  // - setMemberBalance
  //   Should take 2 arguments:
  //   - a member address
  //   - and an integer amount
  //   And should set the
  //   provided member's balance to the
  //   provided amount.
  // - getMemberBalance
  //   Should take 1 argument:
  //   - member address
  //   And should return the balance for that
  //   member.
  // ----------------------------------------

  describe.skip('4.1', () => {
    it('should not expose private properties', contract('Koan4', async ({ accounts, instance }) => {
      assert.notIncludeMembers(Object.keys(instance.methods), [
        '_memberBalances',
      ])
    }))

    describe('set / get', () => {
      it('should set and get _memberBalances as expected', contract('Koan4', async ({ accounts, instance }) => {
        // when ... we increment the balance of a member and then get their balance
        await ContractUtils.send(
          instance.methods.setMemberBalance(accounts[1], 123),
          { from: accounts[0] },
          true,
        )
        const result = await ContractUtils.call(
          instance.methods.getMemberBalance(accounts[1]),
          { from: accounts[0] },
        )

        // then ... should return expected value
        assert.deepEqual(result, '123')
      }))
    })
  })
})
