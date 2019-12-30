// import package
const Web3 = require('web3');

// set a provider
const web3 = new Web3('http://localhost:8545');

let privkey = "0xfc33eaffa2fa215d9f825d9b27c84c88aed0c565b26026d813710749391fa56b";
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
    gasPrice: "20000000000",
    to: "0x257F83505Af8a81505a9CF4397efA907A1FEB45B",
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
    data: "0x",
    chainId: 1
};

// sign and send a transaction
wallet.signTransaction(rawTransaction)
.then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
.then(receipt => console.log("Transaction receipt:", receipt))
.catch(err => console.error(err));
