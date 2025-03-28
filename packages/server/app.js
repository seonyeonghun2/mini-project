// const express = require('express')
import express from "express"
const app = express()
import mongoose from 'mongoose'

import indexRouter from './routes/index.js';
import userRouter from './routes/user.route.js'

app.use('/', indexRouter);
app.use('/users', userRouter); // path가 /user 라고 요청오면 처리

export default app;