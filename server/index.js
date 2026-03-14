import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./db/db.js"
import authRouter from "./routes/auth.js"
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); 
await connectDB()
app.get("/",(req,res)=>{
   res.json({"Message":"Sever done"})
})
app.use("/api/v1/auth",authRouter);
app.listen(process.env.PORT,()=>{
   console.log(`Server Started on http://localhost:${process.env.PORT}`)
})