const { Server } = require('socket.io')

module.exports = (server) => {
    // this will listen for client's request for handshake
    const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } })

    // after the handshake the connection will be trigger
    io.on('connection', (socket) => {
        console.log('Connected successfully')
        socket.on('create-room', ({ yourId, otherId }) => {
            const roomId = [yourId, otherId].sort().join('_')
            socket.join(roomId)
        })
    })
    // npm i socket.io (server)
    // npm i socket.io-client (client)
}