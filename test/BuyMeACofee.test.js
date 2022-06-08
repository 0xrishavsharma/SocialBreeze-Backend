const { assert } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("BuyMeACoffee", () => {
    let buyMeACoffee;
    let deployer;
    let mockV3Aggregator;
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
        
    })
})