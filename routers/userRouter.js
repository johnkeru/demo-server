const { Router } = require('express')
const { login, register, currentUser, getAllUsers } = require('../controllers/userController')
const auth = require('../middlewares/auth')

const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/currentUser', auth, currentUser)
userRouter.get('/getAllUsers', auth, getAllUsers)

module.exports = userRouter