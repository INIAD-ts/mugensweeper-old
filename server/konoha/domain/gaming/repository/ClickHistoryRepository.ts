import { getPrismaClient } from '$/service/getPrismaClient'
import { z } from 'zod'
import type { ClickHistoryModel } from '../model/ClickHistoryModel'

export const ClickHistoryRepository = {
  getAllCount: () => getPrismaClient().clickHistory.count(),
  findAll: () =>
    getPrismaClient()
      .clickHistory.findMany()
      .then((data): ClickHistoryModel[] =>
        data.map((d) => ({
          clickHistoryId: z.number().brand('ClickHistoryId').parse(d.clickHistoryId),
          userId: z.string().brand('UserId').parse(d.userId),
          pos: { x: d.posX, y: d.posY },
          createdAt: d.createdAt.getTime(),
          mouseBtn: d.mouseBtn,
        }))
      ),
  save: async (clickHistory: ClickHistoryModel): Promise<void> => {
    await getPrismaClient().clickHistory.upsert({
      where: { clickHistoryId: clickHistory.clickHistoryId },
      update: {
        userId: clickHistory.userId,
        mouseBtn: clickHistory.mouseBtn,
      },
      create: {
        clickHistoryId: clickHistory.clickHistoryId,
        userId: clickHistory.userId,
        createdAt: new Date(clickHistory.createdAt),
        mouseBtn: clickHistory.mouseBtn,
        posX: clickHistory.pos.x,
        posY: clickHistory.pos.y,
      },
    })
  },
}
