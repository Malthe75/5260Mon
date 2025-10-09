import { Socket } from 'socket.io'
import { CharacterTemplate } from '../types'

export class Player {
  id: string
  socket: Socket
  character: CharacterTemplate
  currentHealth: number
  isAlive: boolean

  constructor(id: string, socket: Socket, character: CharacterTemplate) {
    this.id = id
    this.socket = socket
    this.character = character
    this.currentHealth = character.maxHealth
    this.isAlive = true
  }

  takeDamage(damage: number): void {
    this.currentHealth -= damage
    if (this.currentHealth < 0) {
      this.currentHealth = 0
      this.isAlive = false
    }
  }

  heal(amount: number): void {
    this.currentHealth += amount
    if (this.currentHealth > this.character.maxHealth) {
      this.currentHealth = this.character.maxHealth
    }
  }

  applyBuff(buffId: string): void {
    // Placeholder for buff logic
    console.log(`Applying buff ${buffId} to player ${this.id}`)
  }
}
