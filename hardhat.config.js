require('@nomiclabs/hardhat-waffle');
require('@openzeppelin/hardhat-upgrades');

require('dotenv').config();
const { RINKEBY_API_URL, PRIVATE_KEY } = process.env;

console.log('RINKEBY_API_URL=', RINKEBY_API_URL, '\nkey=', PRIVATE_KEY);
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.14',
    settings: {
      optimizer: {
        enabled: true,
        runs: 10_000,
      },
    },
  },
  defaultNetwork: 'rinkeby',
  networks: {
    hardhat: {},
    rinkeby: {
      url: RINKEBY_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

  mocha: {
    timeout: 180000,
  },
};
