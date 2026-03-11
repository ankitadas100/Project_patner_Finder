import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./db/db.js"
const app = express()
app.use(express.json())
app.use(cors())
await connectDB()
app.get("/",(req,res)=>{
   res.json({"Message":"Sever done"})
})
app.listen(process.env.PORT,()=>{
   console.log(`Server Started on http://localhost:${process.env.PORT}`)
})