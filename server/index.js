
const connectToMongo=require('./db');
const express = require('express');
const dotenv=require('dotenv').config();




connectToMongo();


const app = express()
const port = process.env.PORT || 5000;

var cors = require('cors')

app.use(cors())
app.use(express.json());


//this are routes which we can do with .use


app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



app.listen(port, () => {
  console.log(`eNotebook backend listening on port ${port}`)
})
