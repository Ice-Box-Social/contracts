import hre from "hardhat";

// npx hardhat run deploy/deployOptimism.ts --network optimismGoerli
async function main() {

  const IceBoxMessage = await hre.ethers.getContractFactory("IceBoxMessage");
  const iceBoxMessage = await IceBoxMessage.deploy();

  await iceBoxMessage.deployed();

  console.log("IceBoxMessage deployed to:", iceBoxMessage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });