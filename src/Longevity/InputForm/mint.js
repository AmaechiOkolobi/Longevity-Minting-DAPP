import web3 from './web3';
import Mint from '../../abi/Mint.json';

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(Mint.abi)),
    '0xe20CEBD471FfC167dBAb9CFBf66f2B38FEA48477'
);

export default instance;