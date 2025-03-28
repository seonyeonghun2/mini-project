// const mongoose = require('mongoose');
import mongoose from 'mongoose'

async function connect(uri) {
  try {
    await mongoose.connect(uri);
  } catch(e) {
    console.log(e)
  }
}
export default connect;

// mongoose.on('error', () => {
//     console.log('Mongodb Connect is failed!');
// });
// mongoose.on('disconnected', () => {
//     console.log('Connect is disconnected!');
//     connect(); // 연결 재시도
// })
