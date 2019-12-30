// import package
const Web3 = require('web3');
const BN = require('bignumber.js');

// set a provider
const web3 = new Web3('http://localhost:8545');

let privkey = "0x4e4e5fee69fef503e8038029d500ef7747a09d850f170624934296381c521bd5";
let wallet = web3.eth.accounts.privateKeyToAccount(privkey);

// 0xf65138809709Bd2aD20182dDf1B260D6951Fc6d7
console.log(wallet.address)

let nonce = web3.eth.getTransactionCount(wallet.address)
.then((transactionCount) => {
    return transactionCount;
});

// create a transaction
let rawTransaction = {
    nonce: nonce,
    gas: 21000,
    gasPrice: new BN(10).times(10 ** 9), // 10 Gwei
    to: "0xfe402d0ba8039193d3bc306b242c39986b2c7855",
    value: web3.utils.toHex(web3.utils.toWei('10', 'ether')),
    data: "0x",
    chainId: 1
};

// sign and send a transaction
web3.eth.accounts.signTransaction(rawTransaction, privkey)
.then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
.then(receipt => console.log("Transaction receipt:", receipt))
.catch(err => console.error(err));
