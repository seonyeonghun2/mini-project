import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true        
    },
    passwd: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        length: 11
    },
    sns: String
})

const User = mongoose.model('User', userSchema);

export default User;