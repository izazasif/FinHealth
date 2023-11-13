import express from 'express'
import connectDB from './db/connectdb.js';
import web from "./routes/web.js";
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express() 

const port = process.env.port || '8000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

connectDB(DATABASE_URL);
//json 
app.use(express.json())

//body-perser
app.use(bodyParser.json())
//cors
app.use(cors())

//load Routes 
app.use("/api",web)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})