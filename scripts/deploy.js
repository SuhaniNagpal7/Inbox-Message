const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const compiledContract = require('../build/Inbox.json');

const provider = new Web3.providers.HttpProvider(process.env.INFURA_URL || 'http://localhost:8545');
const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to deploy from account', accounts[0]);

        const result = await new web3.eth.Contract(compiledContract.abi)
            .deploy({ data: compiledContract.evm.bytecode.object, arguments: ['Hello World!'] })
            .send({ from: accounts[0], gas: '1000000' });

        console.log('Contract deployed to', result.options.address);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
};

deploy();