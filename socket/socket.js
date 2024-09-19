const { Server } = require('socket.io')

module.exports = (server) => {
    // this will listen for client's request for handshake
    const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } })

    // after the handshake the connection will be trigger
    io.on('connection', (socket) => {
        console.log('Client connected successfully')
        console.log(socket)
    })
}