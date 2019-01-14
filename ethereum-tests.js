const { Web3Utils } = require('ethereum-utils')

module.exports = {
  web3: Web3Utils.getWeb3(),
  accounts: [
    process.env.ACCOUNT1_ADDRESS,
    process.env.ACCOUNT2_ADDRESS,
    process.env.ACCOUNT3_ADDRESS,
  ],
  accountPKs: [
    process.env.ACCOUNT1_PK,
    process.env.ACCOUNT2_PK,
    process.env.ACCOUNT3_PK,
  ],
  contracts: {
    // 'Bank': 'Bank.sol:Bank',
    'Koan1': 'Koan1.sol:Koan1',
    'WhySafeMath': 'WhySafeMath.sol:WhySafeMath',
    'Koan2': 'Koan2.sol:Koan2',
    'Koan3': 'Koan3.sol:Koan3',
    // 'Koan4': 'Koan4.sol:Koan4',
    // 'Koan5': 'Koan5.sol:Koan5',
    // 'Koan6': 'Koan6.sol:Koan6',
    'Koan7': 'Koan7.sol:Koan7',
  }
}
