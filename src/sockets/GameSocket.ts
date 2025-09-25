import { Server } from 'socket.io'

export class GameSocket {
  constructor(private io: Server) {
    this.setupListeners()
  }
  private setupListeners() {
    this.io.on('connection', (socket) => {
      console.log('A player connected')

      socket.on('player1Move', (data: { action: string }) => {
        console.log('Move received:', data)
        // Simple game logic example:
        this.io.emit('gameUpdate', { currentPlayer: 'Player 2', lastMove: data.action })
      })

      socket.on('player2Move', (data: { action: string }) => {
        console.log('Move received:', data)
        // Simple game logic example:
        this.io.emit('gameUpdate', { currentPlayer: 'Player 1', lastMove: data.action })
      })
    })
  }
}
