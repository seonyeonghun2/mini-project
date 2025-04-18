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
        // .populte() : 마치 JOIN 연산처럼~
        const posts = await Post.find().populate('author', 'username').sort({createdAt: -1})
        res.status(201).json(posts)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            status: 'fail', 
            message: '데이터가 없거나 로드하는데 에러가 발생했습니다.' 
        })
    }
}
export const readPost = async (req, res) => {
    try {
        // .populte() : 마치 JOIN 연산처럼~
        const post = await Post.findOne({uuid: req.params.id}).populate('author', 'username')
        if (!post) {
            return res.status(401).json({
                message: '데이터가 존재하지 않습니다.'
            })
        }
        res.status(201).json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            status: 'fail', 
            message: '데이터가 없거나 로드하는데 에러가 발생했습니다.' 
        })
    }
}
export const updatePost = async (req, res) => {
    const {title, content} = req.body
    const uuid = req.params.id
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: '인증정보가 존재하지 않습니다.'
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    try {
        // Post 모델 : 스키마를 _id 가 아닌 uuid로 변경
        const post = await Post.findOne({uuid}).populate('author', 'username')
        
        if (decoded.name !== post.author.username) {
            return res.status(401).json({
                status: 'fail',
                message: '글 수정 권한이 없습니다.'
            })
        }

        if (!post) {
            return res.status(401).json({
                message: '데이터가 존재하지 않습니다.'
            })
        }
        // 기존 post에 새 제목, 새 내용         
        post.title = title
        post.content = content;
        await post.save()

        const updatePost = await Post.findOne({uuid}).populate('author', 'username')
        console.log('update된 글 : ', updatePost)
        
        res.status(201).json({
            message: '업데이트 되었습니다',
            data: updatePost
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            status: 'fail', 
            message: '데이터가 없거나 로드하는데 에러가 발생했습니다.' 
        }) 
    }
}
export const removePost = async (req, res) => {
    // console.log(req.method)
    try {
        const post = await Post.deleteOne({uuid: req.params.id})
        if (!post) {
            return res.status(401).json({
                message: '데이터가 존재하지 않습니다.'
            })
        }
        res.status(201).json({
            message: '글 삭제 성공'
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            status: 'fail', 
            message: '데이터가 없거나 로드하는데 에러가 발생했습니다.' 
        })
    }
}