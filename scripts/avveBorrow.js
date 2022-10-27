const {getWeth, amount, amonut } = require("../scripts/getWeth")
const { getNamedAccounts, ethers } = require("hardhat") 
const { AbiCoder } = require("ethers/lib/utils")
const { networkConfig} = require("../")


async function main() {
        // the protocol trearts everything as an ERC20 token 
        await getWeth()
        const { deployer } = await getNamedAccounts()
        // abi, address
        // Lending pool address Provider: https://goerli.etherscan.io/address/
        //0x5E52dEc931FFb32f609681B8438A51c675cc232d 
        const lendingPool = await getLendingPool(deployer)
        console.log(`LendingPool address ${landingPool.address}`)
        // deposit!
        const wethTokenAddress = 0xC02aaA39b223FE8D0A0e5C4F27eED9083C756Cc2
        // approve
        await approveErc20(wethTokenAddress, lendingPool.address, amonut, deployer )
        console.log("Depositing... ")
        await lendingPool.deposit(wethTokenAddress, amount, deployer, 0)
        console.log("deposited")
        let {availableBorrowsETH, totalDabtETH} = await getBorrowUserData(lendingPool, deployer
            )
            const daiprice = await getDaiprice()
            const amonutDaiToBorrow = availableBorrowsETH.toSring() *0.95 * (1 / daiprice.toNumber() )
            console.log(`you can borrow ${amonutDaiToBorrow} DAI `)
            const amonutDaiToBorrowwei = ethers.utils.parseEther(amonutDaiToBorrow.toString)

        // Borrow Time!
        // how much we have borrowed, how much we have in collateral, how much we can brrower 
        const daiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
        await borrowDai(
            daiTokenAddress, 
            lendingPool, 
            amountDaiToBorrowei, 
            deployer
            )
            await getBorrowUserData(
                lendingPool, 
                deployer)
            await repay(
                amountDaiToBorrowei, 
                daiTokenAddress, 
                lendingPool, 
                deployer
                )
            await getBorrowUserData(
                landingPool, 
                deployer
                )        
}       

async function repay(amount, daiAddress, lendingpool, account) {
    await approveErc20(daiAddress, lendingpool.address, amount, account )
    const repayTx = await lendingpool.repay(daiAddress, amount, 1, account)
    await repayTx.wait(1)
    console.log("Repaued..!")
}

async function borrowDai(
    daiAddress,
    lendingPool,
    amonutDaiToBorrowei,
    account
) {
    const borroTx = await lendingpool.borrow(daiAddress, amountDaiToBorrow, 
        1, 
        0, 
        account
    )
    await borroTx.wait(1)
    console.log("You've borrowed! ")
}


async function getDaiprice(){
    const daiEthPriceFeed = await ethers.getcontractAt
    ("AggregatorV3Interface", 
    "0x773616E4d11A78F511299002da57A0a94577F1f4"
    )
    const price = (await daiEthPriceFeed.latesRoundData())[1]
    console.log(`the DAI/ETH price is ${price.toSring()}`)
    return price
}



async function getBorrowUserData(ledingPool, account){
    const {totalcollateralETH, totalDabtETH, availableBorrowsETH} = await lendingPool.getUserAccountDate(account)
    console.log(`you have${totalcollateralETH} worth of eth`)
    console.log(`you have${totalDabtETH} worth of eth borrowed.`)
    console.log(`you have${availableBorrowsETH} worth of eth.`)
    return {availableBorrowsETH, totalDabtETH, totalcollateralETH, }


}

async function getLendingPool(account) {
    const lendingPoolAddressProvider = await ethers.getContractAt("IlendingPoolAddressesProvider",
     "0x5E52dEc931FFb32f609681B8438A51c675cc232d",
        account   
    )

    const lendingPoolAddress = 
    await lendingPoolAddressProvider.getLendingPool()
    const lendingPool = await ethers.getcontractAt("landingPool", 
    landingPoolAddress, account 
    
    )
    return landingPool

}

async function approveErc20(
    erc20Address, 
    spenderAddress, 
    amountToSpend, 
    account,
 ) {
    const erc20Token = await ethers.getContractAt("IERC20", 
    erc20Address, 
    account
    )
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log("Approved!")

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })