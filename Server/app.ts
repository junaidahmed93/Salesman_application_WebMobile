/// <reference path="./typings/tsd.d.ts" />

var GeneralRoutes = require('./routes/general');


import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import mongoose = require('mongoose');


let app = express();
app.set("port",5000);
app.use(morgan('short'));
let staticDIR = path.resolve(__dirname, "./static");
app.use(express.static(staticDIR));
app.use(bodyParser.json());


app.use('/api',GeneralRoutes);

app.get("*",(req:express.Request , res:express.Response)=>{
    let indexViewPath = path.resolve(__dirname,"./static/admin/index.html");
    res.sendFile(indexViewPath);
});

app.listen(app.get("port"),()=>{
   console.log("Server started at 5000");
    
});

//mongoose.connect("mongodb://localhost/data");
mongoose.connect('mongodb://junaidahmed093:aries1993@ds039175.mongolab.com:39175/salesman');
