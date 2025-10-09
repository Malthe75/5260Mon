export interface Attack {
  id: string
  name: string
  damage: number
  cooldown?: number
}

export interface CharacterTemplate {
  name: string
  maxHealth: number
  images: {
    idle: string
    walk: string
    attack: string
  }
  attacks: Attack[]
}
