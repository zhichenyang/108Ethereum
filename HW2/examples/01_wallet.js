// import package
const Web3 = require('web3');

// set a provider
const web3 = new Web3('http://localhost:8545');

// Exmaple
// privkey: 0x94cf55c01a7dbddd72264341718c0723bdb15c6ffbb1c9c971f430693e8ce94b
// address: 0x257F83505Af8a81505a9CF4397efA907A1FEB45B

// create a wallet by specific privkey
let privkey = '0x94cf55c01a7dbddd72264341718c0723bdb15c6ffbb1c9c971f430693e8ce94b';
let wallet = web3.eth.accounts.privateKeyToAccount(privkey);
console.log(wallet);
console.log("address:", wallet.address);

// create a wallet by random privkey
//let randomWallet = web3.eth.accounts.create(web3.utils.randomHex(32));
//console.log("privkey:", randomWallet.privateKey)
//console.log("address:", randomWallet.address);
