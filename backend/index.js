const express = require('express')
const app = express()
const cors = require('cors');
const paypal = require("paypal-rest-sdk");
const cookieParser = require('cookie-parser');
// 
const port = 3000;
const corsOptions = {
      origin: 'http://localhost:5173',
      methods: 'GET,POST',
      allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// 
paypal.configure({
      "mode": "sandbox",
      "client_id": "AQhXPnJI9qkQisWVSw6pklRIYMPTSmExCplzeP1-PrfyDGjPrApJwwtMh1ol3Z9VrjD_X6cWqxwHtinj",
      "client_secret": "EK-pfaxYYZgO3uaDgewHySGntjgejFU0On9LFk7aGkXq3TRJrpwOuWTkpl9NwxlmQ-NN0K3A06_AI50I"
})



app.post('/payment', async (req, res) => {

      try {
            console.log("payment");

            let create_payment_json = {
                  "intent": "sale",
                  "payer": {
                        "payment_method": "paypal"
                  },
                  "redirect_urls": {
                        "return_url": "http://localhost:3000/success",
                        "cancel_url": "http://localhost:3000/failed"
                  },
                  "transactions": [{
                        "item_list": {
                              "items": [{
                                    "name": "item",
                                    "sku": "item",
                                    "price": "1.00",
                                    "currency": "USD",
                                    "quantity": 1
                              }]
                        },
                        "amount": {
                              "currency": "USD",
                              "total": "1.00"
                        },
                        "description": "This is the payment description."
                  }]
            };

            console.log("reached that far");

            await paypal.payment.create(create_payment_json, function (error, payment) {
                  if (error) {
                        throw error;
                  } else {
                        console.log("Create Payment Response");
                        // console.log(payment);
                        data = payment;
                        res.json(data);
                  }
            });

      } catch (error) {
            console.log(error);
      }
})
// 

app.get('/success', async (req, res) => {

      try {

            const paymentId = req.query.paymentId;
            const token = req.query.token;
            const payerID = req.query.PayerID;

            const execute_payment_json = {
                  "payer_id": payerID,
                  "transactions": [{
                        "amount": {
                              "currency": "USD",
                              "total": "1.00"
                        }
                  }]
            }

            paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                  if (error) {
                        console.log(error)
                        return res.redirect("http://localhost:5173/failed");
                  } else {
                        console.log("Execute Payment Response");
                        // console.log(payment);
                        const response = JSON.stringify(payment);
                        const parsedResponse = JSON.parse(response);

                        const transactions = parsedResponse.transactions[0];

                        console.log("transactions", transactions);

                        return res.redirect("http://localhost:5173/success");
                  }
            })


      } catch (error) {
            console.log(error);
      }

})


app.get('/failed', async (req, res) => {

      return res.redirect("http://localhost:5173/failed");
})


// 
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
})