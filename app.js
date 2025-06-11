const express = require('express')
const frisho = require("freeshow-api") //https://www.npmjs.com/package/freeshow-api

const { sendHTTP, default: api } = frisho;
const app = express()

const port = 3000;

app.get('/',async (req, res)=>{
    const API = api("http://localhost:5505")
    API.sendHTTP("get_shows")
    const apiResponse = await postData("get_show",{"id": "18b53c8b26c"},"http://localhost:5505");
    

    console.log("testinng process")
    res.send(apiResponse)
})

const postData = async (action, data, URL) => {
    
    const query = `?action=${action}&data=${JSON.stringify(data)}`
    const res = await fetch(URL + query, { method: "POST", signal: AbortSignal.timeout(100) }).catch(error)

    // const response = await fetch('https://api.example.com/data', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ name: "Mbah", age: 30 })
    // });
    const result = await res.json();
    console.log("postData")
    console.log(result);
    return result;
};

function error(err) {
    if (err.name === "TimeoutError" || err.name === "AbortError") return
    console.error("Could not connect. Make sure WebSocket/REST is enabled in FreeShow settings>Connection!")
}


app.listen(port, ()=>{
    console.log("server  is running on port ${port}")
})