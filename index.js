const express=require('express');
const app=express();
const cors = require('cors');
const router = require('./router');
const port = process.env.PORT || 5000;


let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use(router);

//db connection
const dbconnect = require('./db/dbconnect');

dbconnect();

app.listen(port, () => console.log(`Node server running on ${port}` ));