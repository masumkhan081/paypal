const express = require('express')
const app = express()
const cors = require('cors');
 
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
// 


// 
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
})