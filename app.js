const express = require(express)
const app = express()

const port = 3000;

app.get('/',(req, res)=>{
    console.log("testinng process")
    res.send('It is working')
})

app.listen(port, ()=>{
    console.log("server  is running on port ${port}")
})