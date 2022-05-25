// import { ethers } from "hardhat";
import React, {useState, useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Mint from './mint.js'

export default function InputForm() {
	const [account, setAccount] = useState();
	const [balance, setBalance] = useState();
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [mints, setMints] = useState();
	const [whitelistAddress, setWhitelistAddress] = useState('');
	const [mintValue, setMintValue] = useState();

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
	
	const mint_whitelist = async () => {
		try{
			const tx = await Mint.methods.setWhitelist(whitelistAddress).send({from:account});
			// setMints(await Mint.methods.checkMint().send({from:account}))
		}catch(err){
			setErrorMessage(err.message)
		}
	}
	
	const mintButton = async () => {
		await Mint.methods.mint(mintValue).call({from:account})
		const newBal = await Mint.methods.balanceOf(account).send({from: account})
		setBalance(newBal)
		setMints(await Mint.methods.checkMint().call({from:account}))
		console.log(mints)
	}

		return (
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
				<Button
					onClick={connectWalletHandler}
					variant="info"
					style={{ width: "150px", maring: "auto", textAlign: "center", marginBottom: '5px' }}
				>
					{connButtonText}
				</Button>
				<Form.Label>
					<strong>Address: {defaultAccount}</strong>
				</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						<strong>Whitelist User</strong>
					</Form.Label>
					<Form.Control 
						onChange={event =>setWhitelistAddress(event.target.value)} 
						type="text" 
						placeholder="Enter Address: 0x...." />
					<Button
					onClick={mint_whitelist}
					variant="info"
					style={{ width: "150px", maring: "auto", textAlign: "center", marginTop: '10px' }}
					>
						Whitelist
					</Button>
				</Form.Group>
				<Form.Group onSubmit={mintButton} style={{marginTop:'10px'}}>
					<Form.Label>
						<strong>Mint Tokens</strong>
					</Form.Label>
					<Form.Control
						onChange={event => setMintValue(event.target.value)}
						type="number"
						placeholder="Amount Of Tokens"
					>
					</Form.Control>
					<Button
						onClick={mintButton}
						variant="info"
						style={{ width: "150px", maring: "auto", textAlign: "center", marginTop: '10px' }}
					>
						Mint Tokens
					</Button>
				</Form.Group>
			</Form>
		);
}