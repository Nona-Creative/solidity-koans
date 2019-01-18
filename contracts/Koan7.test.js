const chai = require('chai')
const { ContractUtils } = require('ethereum-utils')
const chaiAsPromised = require('chai-as-promised')
const parametrize = require('js-parametrize')
const Web3 = require('web3')

const { Contract } = require('../src/common/utils/ethereum-test-utils')

chai.use(chaiAsPromised)

const { assert } = chai
const { create: contract } = Contract(['Koan7'])

describe('7. String and Bytes', () => {

  // ----------------------------------------
  // NOTE: Fixed length Bytes eg. bytes32 are
  // value data types, but are still included
  // in this section.
  // strings & dynamic length Bytes eg. bytes
  // are storage data types.
  // The distinction will become more apparent
  // as you work with each.
  // ----------------------------------------

  // ----------------------------------------
  // We will be working on the Koan7 contract
  // in this section.
  // ----------------------------------------

  // ----------------------------------------
  // This Koan includes some "advanced" problems
  // marked with an *, so remember to if you need to, and come
  // back to them later.
  // ----------------------------------------

  // ----------------------------------------
  // 7.1. string properties
  // ----------------------------------------
  //
  // Unskip the 7.1 describe block.
  //
  // Then add the following private property:
  // - _secretString (string)
  // And the following external methods:
  // - setSecretString:
  //   sets the value of _secretString
  // - getSecretString:
  //   returns the value of _secretString
  // ----------------------------------------

  describe.skip('7.1', () => {
    it('should not expose private properties and methods', contract('Koan7', async ({ accounts, instance }) => {
      assert.notIncludeMembers(Object.keys(instance.methods), [
        '_secretString',
      ])
    }))

    parametrize([
      ["AAA bbb cCc"],
      ["abcDEF"],
    ], value => {
      it('should allow setting secret and getting should return expected value', contract('Koan7', async ({ accounts, instance }) => {
        // when ... we set and then get the secret string
        const tx1 = await ContractUtils.send(
          instance.methods.setSecretString(value),
          { from: accounts[0] },
          true,
        )
        console.log(`setSecretString("${value}") uses ${tx1.gasUsed} gas`)
        const result = await ContractUtils.call(
          instance.methods.getSecretString(),
          { from: accounts[0] },
        )
        // then
        // ... should not return a bytes type
        // ... and should contain the correct value
        assert.isFalse(Web3.utils.isHexStrict(result))
        assert.equal(result, value)
      }))
    })
  })

  // ----------------------------------------
  // 7.2. bytes32 properties
  // ----------------------------------------
  //
  // Unskip the 7.2. describe block.
  //
  // Now we will do the same again, but using
  // Bytes32 instead of string data types.
  //
  // Add the following private property:
  // - _secretBytes32 (bytes32)
  // And the following external methods:
  // - setSecretBytes32:
  //   sets the value of _secretBytes32
  // - getSecretBytes32:
  //   returns the value of _secretBytes32
  //
  // NOTE: have a look at the test below.
  //
  // Because we are working with Bytes we
  // need to convert our parametrized string
  // value using ``Web3.utils.toHex``
  // before passing it as an argument to our
  // setSecretBytes32 method.
  //
  // And also we need to convert the result
  // of getSecretBytes32 using ``Web3.utils.toUtf8``
  // before we can assert that it equals our
  // expected string.
  //
  // Also you'll notice we are logging the
  // gas used by our setters, once you have
  // these tests passing, look at the
  // gas used by each approach, and you'll
  // see that using bytes32 cost less gas
  // than the string equivalents.
  // ----------------------------------------

  describe.skip('7.2', () => {
    it('should not expose private properties and methods', contract('Koan7', async ({ accounts, instance }) => {
      assert.notIncludeMembers(Object.keys(instance.methods), [
        '_secretBytes32',
      ])
    }))

    parametrize([
      ["AAA bbb cCc"],
      ["abcDEF"],
    ], value => {
      it('should allow setting secret and getting should return expected value', contract('Koan7', async ({ accounts, instance }) => {
        // when ... we set and then get the secret bytes
        const tx1 = await ContractUtils.send(
          instance.methods.setSecretBytes32(Web3.utils.toHex(value)),
          { from: accounts[0] },
          true,
        )
        console.log(`setSecretBytes32("${value}") uses ${tx1.gasUsed} gas`)
        const result = await ContractUtils.call(
          instance.methods.getSecretBytes32(),
          { from: accounts[0] },
        )
        // then ... should return a bytes type of the correct value
        assert.isTrue(Web3.utils.isHexStrict(result))
        assert.equal(Web3.utils.toUtf8(result), value)
      }))
    })
  })

  // ----------------------------------------
  // 7.3. Byte manipulation
  // ----------------------------------------
  //
  // Unskip the 7.3 describe block.
  //
  // Add the following external methods:
  // - getNameAsBytes
  //   Should return the name property
  //   as a bytes data type, with the first
  //   letter replaced by an X eg.
  //   "Xoan Seven"
  // ----------------------------------------

  describe.skip('7.3', () => {
    it('should return name as bytes with X instead of first letter', contract('Koan7', async ({ accounts, instance }) => {
      // when ... we get the name as bytes
      const result = await ContractUtils.call(
        instance.methods.getNameAsBytes(),
        { from: accounts[0] },
      )
      // then ... should return a bytes type of the correct value
      assert.isTrue(Web3.utils.isHexStrict(result))
      assert.equal(Web3.utils.toUtf8(result), "Xoan Seven")
    }))
  })

  // ----------------------------------------
  // 7.4. String Obfuscation *
  // ----------------------------------------
  //
  // Unskip the 7.4 describe block.
  //
  // Add the following public property:
  // - _cardNumber (string) = "123 456 789"
  //
  // Add the following external methods:
  // - getCardNumber:
  //   Should return _cardNumber, but with
  //   all but the first 4 characters
  //   redacted (using x's) eg.
  //   "123 xxx xxx"
  //   The return value should be a bytes type
  // ----------------------------------------

  describe.skip('7.4', () => {
    it('should return redacted version of _cardNumber', contract('Koan7', async ({ accounts, instance }) => {
      // when ... we get the card number
      const result = await ContractUtils.call(
        instance.methods.getCardNumber(),
        { from: accounts[0] },
      )
      // then
      // ... should return a bytes type of the correct value
      // ... but with all but the first four letters redacted
      assert.isTrue(Web3.utils.isHexStrict(result))
      assert.equal(Web3.utils.toUtf8(result), '123 xxx xxx')
    }))
  })

  // ----------------------------------------
  // 7.5. String Concatenation *
  // ----------------------------------------
  //
  // Unskip the 7.5 describe block.
  //
  // Add the following public properties:
  // - firstName (bytes) = "Kelvin"
  // - lastName (bytes) = "Koan"
  //
  // Add the following external methods:
  // - getFullName:
  //   Should return a concatenation of
  //   firstName and lastName.
  //   The return value should be a bytes type
  // ----------------------------------------

  describe.skip('7.5', () => {
    it('should return correct values for public first and last names', contract('Koan7', async ({ accounts, instance }) => {
      // when ... we get the first and last name properties
      const firstName = await ContractUtils.call(
        instance.methods.firstName(),
        { from: accounts[0] },
      )
      const lastName = await ContractUtils.call(
        instance.methods.lastName(),
        { from: accounts[0] },
      )
      // then ... should return expected values
      assert.equal(Web3.utils.toUtf8(firstName), 'Kelvin')
      assert.equal(Web3.utils.toUtf8(lastName), 'Koan')
    }))

    it('should return concatenated first and last names', contract('Koan7', async ({ accounts, instance }) => {
      // when ... we get the full name
      const result = await ContractUtils.call(
        instance.methods.getFullName(),
        { from: accounts[0] },
      )
      // then ... should return a bytes type of the correct value
      assert.isTrue(Web3.utils.isHexStrict(result))
      assert.equal(Web3.utils.toUtf8(result), 'Kelvin Koan')
    }))
  })
})
