import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import groceryRouter from '../src/routers/grocery.router.js'
import userRouter from '../src/routers/user.router.js'
import orderRouter from '../src/routers/orders.router.js'
import uploadRouter from '../src/routers/upload.router.js'

import { dbconnect } from './Config/database.config.js'
dbconnect()

const app = express()
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))

app.use('/api/groceries', groceryRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)

const PORT = 5000

app.listen(PORT, ()=>{
    console.log('Listening on port ' + PORT)
})