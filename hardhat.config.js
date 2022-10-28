const { task } = require('hardhat/config');

/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle')
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const {API_URL,PRIVATE_KEY} = process.env;

task('accounts',"Prints the list of all accounts",async()=>{
  const accounts = await ethers.getSigners();
  for(const account of accounts){
    console.log(account.address);
  }
})
module.exports = {
  solidity: {version:"0.8.17",},
  paths:{artifacts:"./client/src/artifacts",},
  defaultNetwork:'goerli',
  networks:{
    hardhat:{},
    goerli:{
      url:API_URL,
      accounts:[PRIVATE_KEY]
    }
  }
};
