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
console.log('Contract source code:', source);

// Create input object for solc compiler
const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
            }
        },
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};

console.log('Compiling with solc version:', solc.version());

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check for errors
if (output.errors) {
    let hasError = false;
    output.errors.forEach(error => {
        if (error.severity === 'error') {
            console.error('Compilation error:', error.formattedMessage);
            hasError = true;
        } else {
            console.warn('Compilation warning:', error.formattedMessage);
        }
    });
    if (hasError) {
        throw new Error('Contract compilation failed');
    }
}

// Extract contract
const contract = output.contracts['Inbox.sol'].Inbox;

console.log('Contract ABI:', JSON.stringify(contract.abi, null, 2));
console.log('Contract bytecode length:', contract.evm.bytecode.object.length);

// Write the compiled contract to build directory
fs.writeFileSync(
    path.resolve(buildPath, 'Inbox.json'),
    JSON.stringify({
        abi: contract.abi,
        evm: {
            bytecode: {
                object: contract.evm.bytecode.object
            }
        }
    }, null, 2)
);

console.log('Contract compiled successfully!');
