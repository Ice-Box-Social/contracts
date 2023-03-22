import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@nomicfoundation/hardhat-toolbox";
import "@matterlabs/hardhat-zksync-toolbox";

import fs from "fs";

const optimismGoerliUrl = `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

let accounts = { mnemonic: mnemonic() };
module.exports = {
  zksolc: {
    version: "1.3.1",
    compilerSource: "binary",
    settings: {},
  },
  networks: {
    zkSyncTestnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      gasPrice: 1000000000,
      zksync: true,
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      gasPrice: 1000000000,
      accounts: accounts,
    },
    optimismGoerli: {
      url: optimismGoerliUrl,
      accounts: accounts,
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
      // gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    taiko: {
      url: "https://rpc.a2.taiko.xyz",
      accounts: process.env.PRIVATE_KEY,
    },
    scrollAlpha: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: process.env.PRIVATE_KEY,
    },
    mantleTestnet: {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: process.env.PRIVATE_KEY,
    },
  },
  solidity: {
    version: "0.8.17",
  },
};

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    console.log(e);
    console.log("WARNING: No mnemonic file created for a deploy account.");
  }
  return "";
}
