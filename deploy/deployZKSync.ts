import { Wallet, utils } from "zksync-web3";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import hre from "hardhat";
import * as dotenv from 'dotenv';
dotenv.config();
// npx hardhat run deploy/deployZKSync.ts --network zkSyncTestnet

const PRIVATE_KEY: string = process.env.ZKS_PRIVATE_KEY || "";
if (!PRIVATE_KEY) {
  throw new Error("Please set ZKS_PRIVATE_KEY in the environment variables.");
}

async function main() {

  const wallet = new Wallet(PRIVATE_KEY);

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("IceBoxMessage");
  
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: deploymentFee.mul(2),
  });

  await depositHandle.wait();

  const greeterContract = await deployer.deploy(artifact, []);

  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });