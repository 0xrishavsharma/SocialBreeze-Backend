const { assert } = require("chai")
const { getNamedAccounts, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("BuyMeACoffee", async () => {
          let buyMeACoffee
          let deployer
          const sendValue = ethers.utils.parseEther("0.1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              buyMeACoffee = await ethers.getContract("BuyMeACoffee", deployer)
          })

          it("It allows people to fund and withdraw", async () => {
              await buyMeACoffee.fund({ value: sendValue })

              const withdrawingBalance = await buyMeACoffee.withdraw()

              const withdrawalReceipt = await withdrawingBalance.wait(1)

              const endingBalance = await buyMeACoffee.provider.getBalance(
                  buyMeACoffee.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
