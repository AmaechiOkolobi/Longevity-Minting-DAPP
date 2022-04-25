import web3 from './web3'
import Mint from './artifacts/contracts/Mint.json'

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(Mint.abi)),
    '0x5FbDB2315678afecb367f032d93F642f64180aa3'
);

export default instance;