// import { ethers } from "hardhat";
import React, {useState, useEffect} from "react";
import Mint from '../../abi/Mint.json';
import {ethers} from 'ethers'

export default function InputForm() {
	const [account, setAccount] = useState();
	const [mint, setMint] = useState();
	const [signer, setSigner] = useState();
	const [input, setInput] = useState();
	const [balance, setBalance] = useState(0);

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);
	const [provider, setProvider] = useState(null);
	const [contract, setContract] = useState(null);
	
	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		window.location.reload();
	}

	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(0x841E3B6422F46d4E576dCD8f84A1bDF6b2105b65, JSON.parse(JSON.stringify(Mint.abi)), tempSigner);
		setContract(tempContract);	
	}

	const mint_whitelist = (event) => {
		event.preventDefault();
		const input = event.target.setText.value.toString()
		console.log(input)
		contract.setWhitelist(input);
	}
	
	const mintButton = async () => {

		const tx3 = await mint.connect(signer).mint(1)
		console.log(tx3)

	}
	  
	return (
		<div>
		<h4> {"CONNECT WALLET"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<form onSubmit={mint_whitelist}>
				<input id="setText" type="string"/>
				<button type={"submit"}> Whitelist Address </button>
			</form>
			<div>
				<button onClick={mintButton} style={{marginTop: '5em'}}> Mint 10 Tokens </button>
			</div>
			{currentContractVal}
			{errorMessage}
		</div>
	);
}