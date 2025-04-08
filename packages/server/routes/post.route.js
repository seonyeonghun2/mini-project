import express from 'express'
import * as postController from '../controllers/post.controller.js'
const router = express.Router()

router.post('/posts', postController.createPosts) // 쓰기
router.get('/posts', postController.readPosts) // 전체 글 읽기
router.get('/posts/:id', postController.readPost) // 개별 글 읽기
router.delete('/posts/:id', postController.removePost) // 글 삭제
/*
router.put() // 수정
router.delete() // 삭제
*/

export default router;