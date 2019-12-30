// import package
const Web3 = require('web3');
const fs = require('fs')

// set a provider
const web3 = new Web3('http://localhost:8545');

// read from keystore
try {
    var data = fs.readFileSync('../keystore', 'utf8');
    // console.log(data);
} catch (err) {
    console.log("File read failed:", err);
}

let password = "nccu";

let wallet = web3.eth.accounts.wallet.decrypt([data], password);
console.log(wallet['0'].address);
