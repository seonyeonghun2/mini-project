import express from 'express'
const router = express.Router()
import userControl from '../controllers/user.contoller.js'


router.get('/', (req, res) => {
  res.send('users list is returned!')
})
router.post('/regist', userControl.regist)
router.post('/login', userControl.login)
router.put('/:id', (req, res) => {
  res.send('some user is updated!')
})
router.delete('/:id', (req, res) => {
  res.send('some user is removed!')
})

export default router;