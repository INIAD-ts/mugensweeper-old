import type { Board, Bomb } from '.'
import { defineController } from './$relay'

const bombs: Bomb[] = [{ type: 'bomb', pos: { x: 1, y: 0 } }]

const board: Board = {
  type: 'board',
  cells: [
    {
      type: 'cell',
      pos: { x: 0, y: 0 },
      count: 1,
      opened: true,
    },
  ],
}
export const getBoard = () => board
/*export const clickCell = (pos: Pos): Board => {
  const hasBomb = bombs.some((b) => b.pos.x === pos.x && b.pos.y)
}*/
export default defineController(() => ({
  get: () => {
    return { status: 200, body: board }
  },
  /*post: ({ body }) => {
    const newCell: Cell = {
      type: 'cell',
      pos: body,
      count: 2,
      opened: true,
    }

    boardMap.cells.push(newCell)
  },*/
}))
