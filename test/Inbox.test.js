const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledContract = require('../build/Inbox.json');

let accounts;
let inbox;

beforeEach(async () => {
    try {
        accounts = await web3.eth.getAccounts();
        const Inbox = new web3.eth.Contract(compiledContract.abi);
        inbox = await Inbox.deploy({
            data: '0x' + compiledContract.evm.bytecode.object,
            arguments: ['Hi there!']
        }).send({
            from: accounts[0],
            gas: '3000000'
        });
    } catch (error) {
        console.error('Error in beforeEach:', error);
        throw error;
    }
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});
