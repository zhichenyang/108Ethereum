var express = require('express');
var router = express.Router();

const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

const contract = require('../contract/Fish_new.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});


//transition
router.post('/transitionCard',function(req, res, next){
  let fish = new web3.eth.Contract(contract.abi);
  fish.options.address = req.body.address;
  fish.methods.transitionCard(req.body.test1, req.body.test2, req.body.test3).send({
    from: req.body.account,
    gas: 3400000,
  })
  .on('receipt', function (receipt) {
    res.send(receipt);
  })
  .on('error', function (error) {
    res.send(error.toString());
  })
});


//register
router.post('/register', function (req, res, next) {
  let fish = new web3.eth.Contract(contract.abi);
  fish.options.address = req.body.address;
  fish.methods.newUser(req.body.userName, req.body.userPwd).send({
    from: req.body.account,
    gas: 3400000,
  })
  .on('receipt', function (receipt) {
    res.send(receipt);
  })
  .on('error', function (error) {
    res.send(error.toString());
  })
});

//login
router.post('/login', function (req, res, next) {
  let fish = new web3.eth.Contract(contract.abi);
  fish.options.address = req.body.address;
  fish.methods.Login(req.body.userName, req.body.userPwd).send({
    from: req.body.account,
    gas: 3400000,
  })
  .on('receipt', function (receipt) {
    res.send(receipt);
  })
  .on('error', function (error) {
    res.send(error.toString());
  })
});

//reload
router.get('/reload', async function (req, res, next) {
  let fish = new web3.eth.Contract(contract.abi);
  fish.options.address = req.query.address;
  let userName = await fish.methods.getData().call({ from: req.query.account });
  let cards_Easy = await fish.methods.getCard_Easy().call({ from: req.query.account });
  let cards_Medium = await fish.methods.getCard_Medium().call({ from: req.query.account });
  let cards_Hard = await fish.methods.getCard_Hard().call({ from: req.query.account });
  res.send({
    userName: userName,
    cards_Easy: cards_Easy,
    cards_Medium: cards_Medium,
    cards_Hard: cards_Hard
  });
});

//newCard
router.post('/newCard_Easy', function (req, res, next) {
  let fish = new web3.eth.Contract(contract.abi);
  fish.options.address = req.body.address;
  fish.methods.newCard_Easy(req.body.reward).send({
    from: req.body.account,
    gas: 3400000,
  })
  .on('receipt', function (receipt) {
    res.send(receipt);
  })
  .on('error', function (error) {
    res.send(error.toString());
  })
});

router.post('/newCard_Medium', function (req, res, next) {
  let fish = new web3.eth.Contract(contract.abi);
  fish.options.address = req.body.address;
  fish.methods.newCard_Medium(req.body.reward).send({
    from: req.body.account,
    gas: 3400000,
  })
  .on('receipt', function (receipt) {
    res.send(receipt);
  })
  .on('error', function (error) {
    res.send(error.toString());
  })
});

router.post('/newCard_Hard', function (req, res, next) {
  let fish = new web3.eth.Contract(contract.abi);
  fish.options.address = req.body.address;
  fish.methods.newCard_Hard(req.body.reward).send({
    from: req.body.account,
    gas: 3400000,
  })
  .on('receipt', function (receipt) {
    res.send(receipt);
  })
  .on('error', function (error) {
    res.send(error.toString());
  })
});

module.exports = router;
