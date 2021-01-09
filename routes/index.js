var express = require('express');
var router = express.Router();
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51I7R3tFLPxTciqgkScKTCC9QAiIQOpc1lILZCBtjHmahThuoIfJwMcB0Z3S7eaUQ3CnbKwRNZ8FT34k9KuM2YuBc00UYptRtmS");

var data = [
  { id: '1', name: 'Product[1]', desc: 'Product 1 Description', value: '10' },
  { id: '2', name: 'Product[2]', desc: 'Product 2 Description', value: '20' },
  { id: '3', name: 'Product[3]', desc: 'Product 3 Description', value: '30' }];


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { data });
});

router.get('/checkout/:id', function (req, res, next) {
  const { id } = req.params;
  res.render('checkout', { product: data[id - 1] });
});

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});


const calculateOrderAmount = items => {
  console.log('>>>>>>>>>>>>>>>>>>>>', items[0].id);
  //var { id } = items['id'];

  //  console.log('>>>>>>>>>>>>>>>>>>>>', id);

  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1000;
};

module.exports = router;
