import fs from 'fs'
import path from 'path'
import { CharacterTemplate } from './types'
// Load characters into a static registry
export class CharacterRegistry {
  private static characters = new Map<string, CharacterTemplate>()

  static init() {
    const charactersDir = path.join(__dirname, './characters')
    const files = fs.readdirSync(charactersDir)

    for (const file of files) {
      if (file.endsWith('.json')) {
        const raw = fs.readFileSync(path.join(charactersDir, file), 'utf-8')
        const character = JSON.parse(raw) as CharacterTemplate
        this.characters.set(character.name, character)
      }
    }
    console.log(`Loaded ${this.characters.size} characters.`)
  }

  static get(id: string): CharacterTemplate | undefined {
    return this.characters.get(id)
  }

  static getAll(): CharacterTemplate[] {
    return Array.from(this.characters.values())
  }
}
