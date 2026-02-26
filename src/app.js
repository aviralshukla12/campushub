import express from "express"
import connectdb from "./db/db.js"
import dotenv from "dotenv";

dotenv.config();
const app = express();

connectdb();

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})