import nodeContract from "../build/contracts/nodeContract.json";
import contract from "truffle-contract";

export default async(provider) => {
    const node = contract(nodeContract);
    node.setProvider(provider);

    let instance = await node.deployed();
    return instance;
};