
const express = require("express");
const app = express();
const keys = require("./config/keys");
const cors = require('cors');
const axios = require('axios');



app.use(cors());
app.use(express.static("public"));
app.use(express.json());


//Vitamu 

//const stripe = require("stripe")(keys.stripeSecretKey);
const stripe = require("stripe")("sk_test_51LOrQYKGr3XuaAt4d9fT0XXB8CrL4GKbBHG3t8alb1Yo1aIULBvpbUm8UwDZNWNx5YRSatAzkHJH3Jlx25qlPtow00dTA8p2Ij");




const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items[0].amount)
  console.log(items[0].user_mail)


  return items[0].amount
  
}; 


app.post("/create-payment-intent", async (req, res) => {
        
  const customer = await stripe.customers.create({
    email: req.body.items[0].user_mail,
    name: req.body.items[0].name,
    description: "Vitamu Customer for Recheck",

  });

  console.log(customer);

  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({

    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description:"Recheck Service",
    customer: customer.id,
    
   
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});





app.listen(8080, () => console.log("Node server listening on port 4242!"));