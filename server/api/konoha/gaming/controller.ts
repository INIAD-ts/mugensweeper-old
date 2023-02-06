import { ClickHistoryUseCase } from '$/konoha/domain/gaming/usecase/ClickHistoryUsecase'
import { parseUserId } from '$/types/parseBranded'
import { z } from 'zod'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: {
    validators: {
      body: z.object({
        userId: z.string(),
        mouseBtn: z.enum(['left', 'right']),
        pos: z.object({ x: z.number().int(), y: z.number().int() }),
      }),
    },
    handler: async ({ body }) => {
      const clickHistories = await ClickHistoryUseCase.clickBoard({
        userId: parseUserId(body.userId),
        mouseBtn: body.mouseBtn,
        pos: body.pos,
      })
      return { status: 201, body: clickHistories }
    },
  },
}))
