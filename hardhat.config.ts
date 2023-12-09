import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
const fs = require('fs');

const privateKey = fs.readFileSync('.secret').toString().trim() || '01234567890123456789';

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: '0.8.19',
};

export default config;
