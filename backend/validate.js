//sslcommerz validation 

app.get('/validate', (req, res) => {
      const data = {
            val_id: ADGAHHGDAKJ456454 //that you go from sslcommerz response
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
      sslcz.validate(data).then(data => {
            //process the response that got from sslcommerz 
            // https://developer.sslcommerz.com/doc/v4/#order-validation-api
      });
}) 