import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { GameSocket } from './sockets/GameSocket'
import { CharacterRegistry } from './CharacterRegistry'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

// Serve static frontend
app.use(express.static(path.join(__dirname, '../public')))

CharacterRegistry.init()
new GameSocket(io)

server.listen(3000, () => console.log('Server running on http://localhost:3000'))
