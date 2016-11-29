const express = require('express')
const socketio = require('socket.io')

const hostname = process.env['HOSTNAME'] || 'NO_HOSTNAME'

const app = express()
const server = require('http').Server(app)
const io = socketio.listen(server)

app.use(express.static('public'))

io.origins('*:*')

io.on('connection', (socket) => {
  console.log('connected')

  socket.on('echo', function (data) {
    console.log(`echoing: ${data}`)
    socket.emit('echo', `[${data}] ${hostname}`)
  })
})

io.on('error', (err) => {
  console.log(`error: ${err}`)
})

server.listen(8080)
console.log('server started')
