async function main() {
    // We get the contract to deploy
    const Mint = await ethers.getContractFactory("Mint");
    const mint = await Mint.deploy();
  
    await mint.deployed();
  
    console.log("Mint DAPP deployed to:", mint.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });