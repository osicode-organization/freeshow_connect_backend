const express = require('express')
const frisho = require("freeshow-api") //https://www.npmjs.com/package/freeshow-api

const { sendHTTP, default: api } = frisho;
const app = express()

const port = 3000;

app.get('/', async (req, res) => {
    const API = api("http://localhost:5505")
    API.sendHTTP("get_shows")
    const allShows = await postData("get_shows", {}, "http://localhost:5505");
    var idfy = Object.keys(allShows.data);


    console.log('\nEACH DATA\n')

    for (let i = 0; i < idfy.length; i++) {
        console.log(idfy[i]);

        const apiResponse = await postData("get_show", { "id": idfy[i] }, "http://localhost:5505");
        // console.log("apiResponse")
        var lyt = Object.values(apiResponse.data.layouts);
        // console.log("lyt")
        console.log(lyt[0].slides)
    }
    // idfy.forEach(async (tst) => {
    //     console.log(tst)

    //     const apiResponse = await postData("get_show", { "id": tst }, "http://localhost:5505");
    //     console.log("apiResponse")
    //     var lyt = Object.values(apiResponse.data.layouts);
    //     console.log("lyt")
    //     console.log(lyt[0].slides)
    // });



    console.log("Identify\n")
    res.send(allShows)
})

const postData = async (action, data, URL) => {

    const query = `?action=${action}&data=${JSON.stringify(data)}`
    const res = await fetch(URL + query, { method: "POST", signal: AbortSignal.timeout(100) }).catch(error)
    // console.log("res is ")
    // console.log(res)

    const result = await res.json();
    console.log("----------------------------------")
    // console.log(result);
    return result;
};

function error(err) {
    if (err.name === "TimeoutError" || err.name === "AbortError") return
    console.error("Could not connect. Make sure WebSocket/REST is enabled in FreeShow settings>Connection!")
}


app.listen(port, () => {
    console.log("server  is running on port ${port}")
})