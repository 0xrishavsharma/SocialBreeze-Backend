const { run } = require("hardhat");

async function verify(contractAddress, args){
    console.log("Verifying contract on Etherscan...");
    // We are adding this try-catch block because sometimes the console will through us some error if the contract is already verified
    try{
      await run("verify:verify", {
          address: contractAddress,
          constructorArguments: args,
      });
    }catch(e){
      if(e.message.toLowerCase().includes("already verifies")){
        console.log("Already verified!");
      }else{
        console.log(e)
      }
    }
  }

module.exports = {
    verify
}