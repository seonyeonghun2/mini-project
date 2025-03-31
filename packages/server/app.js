// const express = require('express')
import express from "express"
import 'dotenv/config'
const app = express()
import connect from './schemas/index.js';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.route.js'

connect();

app.use('/', indexRouter);
app.use('/users', userRouter); // path가 /user 라고 요청오면 처리(CRUD)
export default app;