const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        console.log("Development network detected! Deploying mocks...")
        const feedMock = await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Price Feed Mock deployed!")
        log("==============================================")
    }
}
module.exports.tags = ["all", "mocks"]

// This code will help us run this mocks script only when we use the following array elements as flags in "yarn hardhat deploy --tags mocks"
