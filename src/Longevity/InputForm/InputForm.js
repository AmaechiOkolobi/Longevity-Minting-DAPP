// import { ethers } from "hardhat";
import React, {useState, useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Mint from '../../abi/Mint.json';
import {ethers, Signer} from 'ethers'
// const Web3 = require('web3')

export default function InputForm() {
	const [account, setAccount] = useState();
	const [mint, setMint] = useState();
	const [signer, setSigner] = useState();
	const [input, setInput] = useState();
	useEffect(()  =>  {
		
		const init = async () => {
			// await loadWeb3();
			const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    		// setAccount(accounts[0])
			// console.log(accounts[0])
			// const rpcURL = 'https://rinkeby.infura.io/v3/1cf3008c9e4841938d744c909ea296fd' // Your RCP URL goes here
			// const web3 = new Web3(rpcURL)
			// const mintContract = new web3.eth.Contract(JSON.parse(JSON.stringify(Mint.abi),0x5FbDB2315678afecb367f032d93F642f64180aa3))
		  	// setMint(mintContract)

			const rpcURL = 'https://rinkeby.infura.io/v3/1cf3008c9e4841938d744c909ea296fd' // Your RCP URL goes here
			const provider = new ethers.providers.JsonRpcProvider(rpcURL)
			const signer = new ethers.Wallet('d7922c2059c30e2df5c8b3af450e0c177b63cdd685333e0b143fb10cc42ee0ef', provider)
			setSigner(signer)
			console.log(signer)
			const mintContract = new ethers.Contract('0x8635deF813aDC0F3B0BfdbA5AaBE2DA0427cBAa9', JSON.parse(JSON.stringify(Mint.abi)), provider)
			setMint(mintContract)
			// let accounts = provider.listAccounts()
            //           .then(result => console.log(result))
            //           .catch(error => console.log(error))
			setAccount(accounts[0])
			console.log(accounts[0])

			const name = await mintContract.name()
			console.log('Name: ', name)
		}

		init()
		.catch(console.error)
	},[])

	//conenct app to wallet
	// async function loadWeb3() {
	// 	if (window.ethereum) {
	// 	  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	// 	  console.log(accounts)
	// 	  setAccount(accounts[0])
	// 	}
	// 	else if (window.web3) {
	// 	  window.web3 = new Web3(window.web3.currentProvider)
	// 	}
	// 	else {
	// 	  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
	// 	}
	//   }
	
	  async function mintButton(event) {
		event.preventDefault()

		const tx = await mint.connect(account).checkMint()
		console.log(ethers.utils.formatEther(tx))

		const tx2 = await mint.connect(signer).setWhitelist()
		console.log(tx2)

		const tx3 = await mint.connect(signer).mint(1)
		console.log(tx3)
		}

	  

	return (
		<Form onSubmit={mintButton}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Row >
					<Col xs={6} sm={6} md={3}>
						<Button
							variant="primary"
							type="submit"
							style={{ width: "100px", maring: "auto", textAlign: "center" }}
							
						>
							SIMULATE MINT AND WHITELIST
						</Button>
					</Col>
				</Row>
			</Form.Group>
		</Form>
	);
}