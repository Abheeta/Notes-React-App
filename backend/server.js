const express = require("express");
const app = express();
const router = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors")

app.use(express.json());
app.use(cors());


app.use("/api/notes", router);




app.listen(process.env.PORT, () => {
    console.log("server is running on port 8000");

    mongoose.connect(process.env.MONGO_URI);
})




