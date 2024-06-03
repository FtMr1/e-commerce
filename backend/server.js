const express = require("express");
const mongoose = require("mongoose");
const  cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const logger = require("morgan")
const mainRoute = require("./routes/index.js")
const port = 5001;


dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Basarılı");
  } catch (error) {
    throw error;
  }
};

app.use(logger("dev"))
app.use(express.json())
app.use(cors())
app.use("/api" , mainRoute)

app.listen(5001, () => {
  connect();
  console.log(`sunucu ${5001} de çalışıyor `);
});
