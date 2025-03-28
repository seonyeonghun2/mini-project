import express from 'express'
const router = express.Router()


  router.get('/', (req, res) => {
    res.send('users list is returned!')
  })
  router.post('/', (req, res) => {
    res.send('new user is created!')
  })
  router.put('/:id', (req, res) => {
    res.send('some user is updated!')
  })
  router.delete('/:id', (req, res) => {
    res.send('some user is removed!')
  })

export default router;