import type { Board, Bomb, Cell, Pos } from '$/api/allen/index'

const bombs: Bomb[] = [{ type: 'bomb', pos: { x: 1, y: 0 } }]

const board: Board = {
  type: 'board',
  cells: [
    {
      type: 'cell',
      pos: {
        x: 0,
        y: 0,
      },
      count: 1,
      opened: true,
    },
  ],
}

export const getBoard = () => board

export const clickCell = (pos: Pos): Board => {
  const hasBomb = bombs.some((b) => b.pos.x === pos.x && b.pos.y)
  if (hasBomb) {
    const newBombCell: Bomb = {
      type: 'bomb',
      pos,
    }
    board.cells.push(newBombCell)
    return board
  } else {
    const newCell: Cell = {
      type: 'cell',
      pos,
      count: 2,
      opened: true,
    }
    board.cells.push(newCell)

    return board
  }
}
