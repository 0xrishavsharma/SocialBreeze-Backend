const {
    networkConfig,
    developmentChains,
} = require("./../helper-hardhat-config")
const { network, getNamedAccounts, deployments } = require("hardhat")
const { verify } = require("../utils/verify")

// function deployFunc(){
//     console.log("This is deploying scripts");
// }

// module.exports.default = deployFunc();

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // If the feed contract doesn't exist then we'll a minimal version of it for our local testing

    //While working with localhost and hardhat network we will be using mocks so that we can make use of Feeds, VRF and other solutions.
    const args = [ethUsdPriceFeedAddress]
    const buyMeACoffee = await deploy("BuyMeACoffee", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(
        `BuyMeACoffee contract deployed on ${network.name} at ${buyMeACoffee.address} address`
    )
    log("==============================================")

    // if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
    //     await verify(buyMeACoffee.address, args);
    // }
}

module.exports.tags = ["all", "BuyMeACoffee"]
