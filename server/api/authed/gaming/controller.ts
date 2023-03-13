import { ClickHistoryUsecase } from '$/domain/gaming/usecase/ClickHistoryUsecase'
import { parseUserId } from '$/types/parseBranded'
import { z } from 'zod'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: {
    validators: {
      body: z.object({
        userId: z.string().brand<'UserId'>(),
        mouseBtn: z.enum(['left', 'right']),
        pos: z.object({ x: z.number().int(), y: z.number().int() }),
      }),
    },
    handler: async ({ body }) => {
      const historyModel = await ClickHistoryUsecase.clickBoard({
        userId: parseUserId(body.userId),
        mouseBtn: body.mouseBtn,
        pos: body.pos,
      })

      return { status: 200, body: historyModel }
    },
  },
}))
