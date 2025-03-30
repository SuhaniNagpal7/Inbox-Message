# Inbox-Message

This project contains a simple Inbox smart contract written in Solidity.

## Contract Features

- Set and get messages
- Simple state management
- Public message storage

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your Infura URL and private key:
```
INFURA_URL=your_infura_url_here
PRIVATE_KEY=your_private_key_here
```

3. Compile the contract:
```bash
npm run compile
```

4. Run tests:
```bash
npm test
```

5. Deploy the contract:
```bash
npm run deploy
```

## Testing

The project uses Mocha for testing. Tests are located in the `test` directory.

## Deployment

The contract can be deployed to any Ethereum network (mainnet, testnet, or local network) using the deploy script. 