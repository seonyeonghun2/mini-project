import mongoose from 'mongoose'
import 'dotenv/config'

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }
  mongoose.connect(process.env.DB_URI, {
    authSource: 'admin'
  })
  .then(() => console.log("Mongodb is connected!"))
  .catch((err) => console.log(err))
}

mongoose.connection.on('error', () => {
    console.log('Mongodb Connect is failed!');
});
mongoose.connection.on('disconnected', () => {
    console.log('Connect is disconnected!');
    connect(); // 연결 재시도
})

export default connect;