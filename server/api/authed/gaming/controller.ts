import { GamingUseCase } from '$/domain/gaming/usecase/GamingUsecase'
import { userIdParser } from '$/types/parseBranded'
import { z } from 'zod'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: {
    validators: {
      body: z.object({
        userId: userIdParser,
        mouseBtn: z.enum(['left', 'right']),
        pos: z.object({ x: z.number().int(), y: z.number().int() }),
      }),
    },
    handler: async ({ body }) => {
      const historyModel = await GamingUseCase.clickBoard({
        userId: userIdParser.parse(body.userId),
        mouseBtn: body.mouseBtn,
        pos: body.pos,
      })

      return { status: 200, body: historyModel }
    },
  },
}))
