const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("BuyMeACoffee", () => {
    let buyMeACoffee;
    let deployer;
    let mockV3Aggregator;
    let fundValue = ethers.utils.parseEther("1");
    beforeEach( async () => {
        // const accounts = await ethers.getSigners();
        // const { deployer } = await getNamedAccounts();
        // const accountZero = accounts[0];
        deployer = (await getNamedAccounts()).deployer; 
        await deployments.fixture(["all"]);
        buyMeACoffee = await ethers.getContract("BuyMeACoffee", deployer); //This line gets the most recently deployed BuyMeACoffee contract.
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
        
    })
    describe("constructor", () => {
        it("sets the aggregator addresses correctly", async ()=>{
            const response = await buyMeACoffee.priceFeed();
            assert.equal(response, mockV3Aggregator.address);
        })
    })

    describe("fund", ()=> {
        it("Fails if we don't donate enough ETH", async () => {
            await expect(buyMeACoffee.fund()).to.be.revertedWith("You need to spend more ETH!");
            // expect is used when we expect something to break or fail.
        })
        it("Fails if the mapping isn't updated correctly", async () =>{
            await buyMeACoffee.fund({value: fundValue});
            const response = await buyMeACoffee.addressToAmountFunded(deployer);
            assert.equal(response.toString(), fundValue.toString());
        })
        it("Adds funder to funders array", async () => {
            await buyMeACoffee.fund({value: fundValue});
            const response = await buyMeACoffee.funders(0);
            assert.equal(response, deployer);
        })
    })

    describe("withdraw function", () => {
        beforeEach( async () => {
            const fundBuyMeACoffee = await buyMeACoffee.fund({value: fundValue});
        })

        it("Withdraw ETH from single funder", async () => {

            // Arrange
            const startingBuyMeACoffeeBalance = await buyMeACoffee.provider.getBalance(buyMeACoffee.address);
            const startingDeployerBalance = await buyMeACoffee.provider.getBalance(deployer);

            // Act
            const withdrawingBalance = await buyMeACoffee.withdraw();
            const waitingAfterWithdrawal = await withdrawingBalance.wait(1);

            const endingBuyMeACoffeeBalance = await buyMeACoffee.provider.getBalance(buyMeACoffee.address);
            const endingDeployerBalance = await buyMeACoffee.provider.getBalance(buyMeACoffee);

            // Assert
            // When we are reading balances from the blockchain the number is usually big so we'll use ".add" instead of using "+" 
            assert.equal(startingBuyMeACoffeeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance);
            assert.equal(endingBuyMeACoffeeBalance, 0);

            // We don't have gas cost as of now. So, to find out the gas cost we'll 
        })
        

    })

})