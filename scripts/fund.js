const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const sendValue = await ethers.utils.parseEther("0.06")

    const { deployer } = getNamedAccounts()
    const buyMeACoffee = await ethers.getContract("BuyMeACoffee", deployer)
    console.log("Funding contract...")
    const funding = await buyMeACoffee.fund({ value: sendValue })
    const fundingScript = await funding.wait(1)

    const startingBalance = await buyMeACoffee.provider.getBalance(
        buyMeACoffee.address
    )
    console.log(
        "Starting balance of contract is ",
        ethers.utils.formatEther(startingBalance.toString())
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
