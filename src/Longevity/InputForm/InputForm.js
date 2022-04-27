// import { ethers } from "hardhat";
import React, {useState, useEffect} from "react";
import Mint from './mint.js'

export default function InputForm() {
	const [account, setAccount] = useState();
	const [balance, setBalance] = useState();
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [mints, setMints] = useState();

	const connectWalletHandler =async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
			setAccount(accounts[0])
			console.log(accounts[0])
		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
	}

	const chainChangedHandler = () => {
		window.location.reload();
	}

	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
	
	const mint_whitelist = async (event) => {
		event.preventDefault();
		const input = event.target.setText.value.toString()
		try{
			const tx = await Mint.methods.setWhitelist(input);
			setMints(await Mint.methods.checkMint().send({from:account}))
		}catch(err){
			setErrorMessage(err.message)
		}
	}
	
	const mintButton = async () => {
		await Mint.methods.mint('1').call({from:account})
		const newBal = await Mint.methods.balanceOf(account).send({from: account})
		setBalance(newBal)
		setMints(await Mint.methods.checkMint().call({from:account}))
		console.log(mints)
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
				{/* Mints Used: {mints} */}
				<div>
					<button onClick={mintButton} style={{marginTop: '5em'}}> 
					Mint 10 Tokens 
					</button>
				</div>
				{/* {balance} */}
				{errorMessage}
			</div>
		);
}