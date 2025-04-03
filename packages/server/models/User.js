import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
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
})

userSchema.pre('save', async function(next) {
    // do stuff
    try {
        const salt = await bcrypt.genSalt(10); // 기본 10, 20, 30,...
        this.password = await bcrypt.hash(this.password, salt); // $2b$10$0MKjRJK74KAe4K8rYirQbuucLWhHV2zhTKjDXriJUsuU6YsPrr9ca
    } catch (err) {
        next(err)
    }    
  });

const User = mongoose.model('User', userSchema);

export default User;