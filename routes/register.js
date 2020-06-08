const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => res.render('public/register'))

router.post('/register', (req, res) => {
  const user = new User()

  Object.keys(req.body).map(key => user[key] = req.body[key])

  user.save(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

module.exports = router
