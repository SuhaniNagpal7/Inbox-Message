const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, '../build');
const contractPath = path.resolve(__dirname, '../contracts', 'Inbox.sol');

// Create build directory
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

// Read the contract
const source = fs.readFileSync(contractPath, 'utf8');

// Create input object for solc compiler
const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check for errors
if (output.errors) {
    output.errors.forEach(error => {
        console.error(error.formattedMessage);
    });
}

// Extract contract
const contract = output.contracts['Inbox.sol'].Inbox;

// Write the compiled contract to build directory
fs.writeFileSync(
    path.resolve(buildPath, 'Inbox.json'),
    JSON.stringify(contract, null, 2)
);

console.log('Contract compiled successfully!');
