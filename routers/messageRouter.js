const { Router } = require('express')
const { getMessages } = require('../controllers/messageController')
const auth = require('../middlewares/auth')

const messageRouter = Router()

messageRouter.get('/getMessages/:yourId/:otherId', auth, getMessages)
// localhost:5000/getMessages/21213213212/23984239843298
module.exports = messageRouter