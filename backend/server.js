const express = require("express");
const app = express();
const router = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors")

app.use(express.json());
app.use(cors());


app.use("/api/notes", router);




app.listen(8000, () => {
    console.log("server is running on port 8000");

    mongoose.connect(`${process.env.MONGO_URI || "mongodb+srv://abitab56:BreadMould12!@cluster0.awo2daj.mongodb.net/?retryWrites=true&w=majority/Notes"}`);
})




