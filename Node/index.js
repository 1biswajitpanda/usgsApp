var https = require("https");
var express = require("express");
var app = express();

app.listen(3000,()=>{
    console.log("The Server is listening on port 3000")
})

app.get("/usgs",(myRequest,myResponse)=>{

    var usgsUrl = new URL("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
    var requestToUsgs = https.request(usgsUrl,(usgsResponse)=>{
        
        myResponse.writeHead(usgsResponse.statusCode,{"content-type":usgsResponse.headers['content-type']})
        
        let usgsResponseData = '';
        usgsResponse.on("data", (chunk)=>{
            usgsResponseData += chunk;
        })
        usgsResponse.on("end",()=>{
            myResponse.end(usgsResponseData);
        })
    })
    requestToUsgs.end();
})

app.get("/", (myRequest,myResponse)=>{
    myResponse.sendFile(__dirname+"/client/index.html")
})

app.use("/favicon.ico",express.static(__dirname+"/client/favicon.ico"))
app.use("/styles.js",express.static(__dirname+"/client/styles.js"))
app.use("/runtime.js",express.static(__dirname+"/client/runtime.js"))
app.use("/polyfills.js",express.static(__dirname+"/client/polyfills.js"))
app.use("/main.js",express.static(__dirname+"/client/main.js"))
app.use("/vendor.js",express.static(__dirname+"/client/vendor.js"))
