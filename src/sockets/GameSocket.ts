import { Server, Socket } from 'socket.io'
import { Player } from '../game/Player'
import { Game } from '../game/Game'
import { CharacterRegistry } from '../CharacterRegistry'

export class GameSocket {
  private io: Server
  private game: Game

  constructor(io: Server) {
    this.io = io
    this.game = new Game()

    this.io.on('connection', (socket: Socket) => {
      console.log(`Player connected: ${socket.id}`)

      // Emit character list on connection
      socket.emit('characterList', CharacterRegistry.getAll())

      // Handle character selection
      socket.on('selectCharacter', (characterId: string) => {
        const char = CharacterRegistry.get(characterId)
        if (!char) return

        const player = new Player(socket.id, socket, char)
        this.game.players.push(player)
        console.log(`Player ${socket.id} selected character ${char.name}`)

        socket.emit('characterSelected', char)
        this.broadcastGameState()
      })

      // Handle attack actions
      socket.on('attack', (attackId: string) => {
        const attacker = this.game.players.find((p) => p.id === socket.id)
        if (!attacker) return

        const defender = this.game.players.find((p) => p.id !== socket.id)
        if (!defender) return

        const attack = attacker.character.attacks?.find((a) => a.id === attackId)
        if (!attack) return

        // Call your Game.ts logic
        this.game.applyAttack(attacker, defender, attack)

        // Broadcast updated state to clients
        this.broadcastGameState()
      })

      // Optional: handle disconnects
      socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`)
        this.game.players = this.game.players.filter((p) => p.id !== socket.id)
        this.broadcastGameState()
      })
    })
  }

  private broadcastGameState() {
    const state = this.game.players.map((p) => ({
      id: p.id,
      currentHealth: p.currentHealth,
      isAlive: p.isAlive,
    }))
    this.io.emit('gameState', state)
  }
}
