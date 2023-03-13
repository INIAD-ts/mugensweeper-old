export type Pos = { x: number; y: number }

export type Bomb = {
  type: 'bomb'
  pos: Pos
}

export type Cell = {
  type: 'cell'
  pos: Pos
  count: number
  opened: boolean
}

export type Board = {
  type: 'board'
  cells: (Cell | Bomb)[]
}

export type Methods = {
  get: {
    resBody: Board
  }
  post: {
    reqBody: Pos
    resBody: Board
  }
}
