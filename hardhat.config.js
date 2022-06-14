require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

const RINKEBY_RPC = process.env.RINKEBY_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "etherscan_key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "coinmarketcap_api_key";



module.exports = {
  solidity: {
    compilers: [
      {version: "0.8.8"},
      {version: "0.6.6"}
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: RINKEBY_RPC,
      accounts: [PRIVATE_KEY],
      blockConfirmation: 6,
      chainId: 4,
    }
  },
  gasReporter:{
    enabled: true, // Will enable it to run when we run our tests
    outputFile: "gas-report.txt",  // Will create a file “gas-report.txt” and create a chart representing the gas.
    noColors: true, // When we export the data to a file the colors get messed up so we are not coloring the output here.
    currency: "INR", //To get gas value in USD/INR or any other currency we need the API key of CoinMarketCap
    // coinmarketcap: COINMARKETCAP_API_KEY, // Adding the CoinMarketCap API 
    token: "MATIC", // Will show the gas price in Matic token, you can change it to Eth or any other token.
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
},
  user: 1,
};
