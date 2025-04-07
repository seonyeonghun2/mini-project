import express from 'express'
import * as postController from '../controllers/post.controller.js'
const router = express.Router()

router.post('/posts', postController.createPosts) // 쓰기
router.get('/posts', postController.readPosts) // 글 읽기
/*
router.put() // 수정
router.delete() // 삭제
*/

export default router;