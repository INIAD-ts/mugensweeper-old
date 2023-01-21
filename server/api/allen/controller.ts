import { clickCell, getBoard } from '$/service/allen/clickCell'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => {
    return { status: 200, body: getBoard() }
  },
  post: ({ body }) => {
    return { status: 200, body: clickCell(body) }
  },
}))
