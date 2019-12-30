const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const TX = require('ethereumjs-tx').Transaction;

// Connect to local node
const web3 = new Web3('http://localhost:8545');

var contracts_path = "./contracts/NCCUToken.sol"

var input = fs.readFileSync(contracts_path, 'utf8');
// 1 activates the optimiser
var output = solc.compile(input, 1);
//console.log(output);

const bytecode = output.contracts[':NCCUToken'].bytecode;
const abi = output.contracts[':NCCUToken'].interface;
//console.log(bytecode);
//console.log(abi);

const account = '0x2B467cC2e26e38ae0bA095e543915de1bF6d3C14';
const privkey = Buffer.from('4e4e5fee69fef503e8038029d500ef7747a09d850f170624934296381c521bd5', 'hex');

let mycontract = new web3.eth.Contract(JSON.parse(abi));
//console.log(mycontract);

mycontract.deploy({
    data : '0x' + bytecode,
    arguments: ['NCCU', 'NCCU Token']
})
    .send({
        from: account,
        gas: 1500000,
        gasPrice: '30000000000000'
    });