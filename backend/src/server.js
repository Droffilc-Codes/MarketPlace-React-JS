import dotenv from 'dotenv'
dotenv.config()

import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import groceryRouter from '../src/routers/grocery.router.js'
import userRouter from '../src/routers/user.router.js'
import orderRouter from '../src/routers/orders.router.js'
import uploadRouter from '../src/routers/upload.router.js'
import accountRouter from '../src/routers/account.router.js'

import { dbconnect } from './Config/database.config.js'
import path, { dirname, join } from 'path'
dbconnect()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
app.use('/api/account', accountRouter)

const publicFolder = path.join(__dirname, 'public')
app.use(express.static(publicFolder))

app.get('*', (req, res)=>{
    const indexFilePath = path.join(publicFolder, 'index.html')
    res.send(indexFilePath)
})

const PORT = 5000

app.listen(PORT, ()=>{
    console.log('Listening on port ' + PORT)
})