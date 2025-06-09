const express = require('express')
const frisho = require("freeshow-api")

const { sendHTTP, default: api } = frisho;
const app = express()

const port = 3000;

app.get('/',(req, res)=>{
    const API = api("http://localhost:5505")
    API.sendHTTP("next_slide")

    console.log("testinng process")
    res.send('It is wworking')
})

app.listen(port, ()=>{
    console.log("server  is running on port ${port}")
})