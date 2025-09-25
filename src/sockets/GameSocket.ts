import { Server } from 'socket.io'

export class GameSocket {
  constructor(private io: Server) {
    this.setupListeners()
  }
  private setupListeners() {
    this.io.on('connection', (socket) => {
      console.log('A player connected')

      socket.on('playerMove', (data: { action: unknown }) => {
        console.log('Move received:', data)
        // Simple game logic example:
        this.io.emit('gameUpdate', { currentPlayer: 'Player 2', lastMove: data.action })
      })
    })
  }
}
