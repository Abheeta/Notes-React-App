const express = require("express");
const app = express();
const router = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient } = require('mongodb');

require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use("/api/notes", router);


const PORT = process.env.PORT || 8000

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);


client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});



