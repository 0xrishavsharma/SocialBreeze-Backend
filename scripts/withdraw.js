const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = getNamedAccounts()
    const buyMeACoffee = await ethers.getContract("BuyMeACoffee", deployer)
    console.log("Funding contract...")
    const fundingContract = await buyMeACoffee.fund({
        value: ethers.utils.parseEther("0.06"),
    })
    console.log("Contract funded!")
    const withdrawingAmount = await buyMeACoffee.withdraw()
    console.log("Amount withdrawn from the contract")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
    })
