const express = require("express");
const app = express();
const router = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use("/api/notes", router);


    mongoose.connect(process.env.MONGO_URI);




app.listen(process.env.PORT || 8000, () => {
    console.log("server is running on port 8000");
    
})




