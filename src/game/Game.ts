import { Player } from './Player'
import { Attack } from '../types'

export class Game {
  players: Player[] = []
  turnIndex: number = 0

  getCurrentPlayer(): Player {
    return this.players[this.turnIndex]
  }

  applyAttack(attacker: Player, defender: Player, attack: Attack): void {
    // 1. Get attack details
    const damage = attack.damage
    console.log(`${attacker.id} uses ${attack.name} dealing ${damage} damage to ${defender.id}`)

    // 2. Apply damage to defender
    defender.takeDamage(damage)
    console.log(`${defender.id} now has ${defender.currentHealth} health.`)

    // 3. Check if defender is defeated
    if (defender.isAlive === false) {
      console.log(`${defender.id} has been defeated!`)
      // Handle end of game logic here
    }

    // 4. Switch turn to the other player
    this.switchTurn()
  }

  switchTurn(): void {
    this.turnIndex = (this.turnIndex + 1) % this.players.length
    console.log(`It's now ${this.getCurrentPlayer().id}'s turn.`)
  }
}
