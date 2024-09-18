require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))

app.get('/', (req, res) => {
    res.json({ message: 'from server' })
})

app.listen(5000, () =>
    console.log('Server is listening on: http://localhost:5000'))