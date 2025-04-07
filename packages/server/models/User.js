import mongoose from 'mongoose'
//import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true        
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    sns: String    
}, {timestamps: true})

// 방법2. User 스키마 정의시 암호 해싱처리
// userSchema.pre('save', async function(next) {
//     // do stuff
//     try {
//         const salt = await bcrypt.genSalt(10); // 기본 10, 20, 30,...
//         this.password = await bcrypt.hash(this.password, salt); // $2b$10$0M...
//     } catch (err) {
//         next(err)
//     }    
//   });

const User = mongoose.model('User', userSchema);

export default User;