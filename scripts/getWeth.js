const { getNamedAccounts, ethers } = require("hardhat")

async function getWeth() {
    const {deployer} = await getNamedAccounts
        // call the "deposit" function on the weth contract
        // abi, contract address
        //
        const iWeth = await ethers.getContractAt(
        "IWeth",
         "0xC02aaA39b223FE8D0A0e5C4F27eED9083C756Cc2",
       deployer 
     )
     const tx = await iWeth.deposit({ value: AMOUNT})
     await tx.wait(1)
     const wethBalance = await iWeth.balanceOf(deployer)
     console.log(`got ${wethBalance.toString()} WETH`)

}
module.exports = { getWeth, amonut}