const express = require("express");
const app = express();
const router = require("./routes");
const mongoose = require("mongoose");

app.use(express.json());

app.use("/notes", router);




app.listen(8000, () => {
    console.log("server is running on port 8000");

    mongoose.connect(`${process.env.MONGO_URI || "mongodb://localhost:27017/Notes"}`);
})




