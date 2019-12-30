// import package
const Web3 = require('web3');

// set a provider
const web3 = new Web3('http://localhost:8545');
console.log(web3);

// list accounts
web3.eth.getAccounts().then(console.log);
