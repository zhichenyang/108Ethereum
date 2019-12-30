const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const TX = require('ethereumjs-tx').Transaction;

const web3 = new Web3('http://localhost:8545');

var contracts_path = "./contracts/NCCUToken.sol"
var input = fs.readFileSync(contracts_path, 'utf8');

// 1 activates the optimiser
var output = solc.compile(input, 1);

const abi = output.contracts[':NCCUToken'].interface;
const contract_address = '0x1687dc2abc42c6ff03213dc1662e6d2922f86712';
const account = '0x2B467cC2e26e38ae0bA095e543915de1bF6d3C14'
const privkey = Buffer.from('4e4e5fee69fef503e8038029d500ef7747a09d850f170624934296381c521bd5', 'hex')

// interact with a contract
async function balanceof() {
    const contract = await new web3.eth.Contract(JSON.parse(abi), contract_address);
    contract.methods.balanceOf(account).call().then(console.log);
};

async function getToeknName() {
    const contract = await new web3.eth.Contract(JSON.parse(abi), contract_address);
    contract.methods.name().call().then(console.log);
    contract.methods.symbol().call().then(console.log);
};

async function transfer() {
    const contract = await new web3.eth.Contract(JSON.parse(abi), contract_address);
    const nonce = await web3.eth.getTransactionCount(account);
    
    const txObject = {
        nonce:    web3.utils.toHex(nonce),
        to:       contract_address,
        gasLimit: web3.utils.toHex(100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: contract.methods.transfer("0x3AbC5186b5e0ecDB2819e72C2Bab9F21595E9784", 1000).encodeABI()
    }

    var tx = new TX(txObject, {'chain': 'ropsten'});
    tx.sign(privkey);
    
    const serializedTX = tx.serialize();
    const rawTX = '0x' + serializedTX.toString('hex');
  
    web3.eth.sendSignedTransaction(rawTX, (err, txHash) => {
        balanceof();
        console.log('txHash:', txHash);
    })
};

balanceof();
getToeknName();
transfer();

