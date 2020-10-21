import express from 'express'               //1
import path from 'path'                     //3
import cors from 'cors'                     //5
import 'express-async-errors'               //4

import './db/connection'

import routes from './routes'               //2
import errorHandler from './errors/handler' //4



const app = express()       //1

app.use(cors())             //5 Allows API to be queried from adresses other than 3333
app.use(express.json())     //1
app.use(routes)             //2
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))  //3
app.use(errorHandler)       //4

app.listen(3333)