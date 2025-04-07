import 'dotenv/config'
import jwt from 'jsonwebtoken'
import Post from '../models/Post.js'
export const createPosts = async (req, res) => {
    const {title, content} = req.body
    // console.log("요청객체 정보 : ", req.headers); // req 요청객체 
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: '인증정보가 존재하지 않습니다.'
        })
    }
    // console.log("요청헤더에 포함된 토큰값 : ", token)
    // const author = req.header // (클라이언트)헤더 : 쿠키 (token) 전송 --> 서버: verify token -->  user._id
    try {        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        const newPost = new Post({
            title,
            content,
            author: decoded.id
        })
        await newPost.save()
        res.status(201).json({
            status: 'success', 
            message: '글 저장하기 성공!'
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            status: 'fail', 
            message: '데이터베이스 저장할수 없습니다.' 
        })
    }
}
export const readPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        console.log(posts);
        // if(posts.length) {
        //     res.status(500).json({
        //         status: 'fail',
        //         message: '데이터가 존재하지 않습니다.'
        //     })
        // }
        res.status(201).json(posts)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            status: 'fail', 
            message: '데이터가 없거나 로드하는데 에러가 발생했습니다.' 
        })
    }
}
// export const updatePosts = () => {

// }
// export const deletePosts = () => {

// }