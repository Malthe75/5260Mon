import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { GameSocket } from ".sockets/GameSocket"
import routes from ./routes

  const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)

const PORT = 3000

app.use("/", routes)

// Socket.IO game logic
new GameSocket(io) // handles all game socket events what?

httpServer.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
})