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

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.awo2daj.mongodb.net/?retryWrites=true&w=majority`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})




