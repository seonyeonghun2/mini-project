// const express = require('express')
import express from "express"
const app = express()
import logger from 'morgan'
import cookieParser from "cookie-parser"
import cors from 'cors'
import connect from './schemas/index.js';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
connect();
app.use(logger('dev'))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json()); // json 해석기
app.use(express.urlencoded({extended: true})); // form데이터 해석기
app.use('/', indexRouter);
app.use('/users', userRouter); // path가 /user 라고 요청오면 처리(CRUD)
app.use('/api', postRouter)
export default app;