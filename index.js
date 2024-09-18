
const express = require('express')
const app = express()
app.get('/', (req, res) => {
    res.json({ message: 'from server' })
})
app.listen(5000, () =>
    console.log('Server is listening on: http://localhost:5000'))