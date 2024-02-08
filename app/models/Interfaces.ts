interface Character {
  id: number,
  actor: string,
  description: string,
  priceMinute: number,
  sceneId: number,
  scene: Scene
}

interface CharacterForm extends Omit<Character, 'id' | 'scene'> {}

interface Scene {
  id: number,
  title: string,
  description: string,
  budget: number,
  minutes: number,
  filmId: number,
  film: Film,
  character: Array<Character>
}

interface SceneForm extends Omit<Scene, 'id' | 'character'> {}

interface Film{
  id: number,
  title: string,
  director: string,
  duration: number,
  budget: number,
  scene: Array<Scene>
}

interface FilmForm extends Omit<Film, 'id'|'scene'> {}

type FetchResponses = Character | Scene | Film;