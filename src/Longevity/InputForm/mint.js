import web3 from './web3';
import Mint from '../../abi/Mint.json';

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(Mint.abi)),
    '0x6F50e63484D437BC459F02B85088464bD9c0a25a'
);

export default instance;