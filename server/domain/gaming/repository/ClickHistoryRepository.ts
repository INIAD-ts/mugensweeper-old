import { ClickHistoryIdParser, userIdParser } from '$/types/parseBranded'
import { getPrismaClient } from 'service/getPrismaClient'
import type { ClickHistoryModel } from '../model/ClickHistoryModel'

export const ClickHistoryRepository = {
  getAllCount: () => getPrismaClient().clickHistory.count(),
  findAll: () =>
    getPrismaClient()
      .clickHistory.findMany({ orderBy: { ClickHistoryId: 'asc' } })
      .then((data): ClickHistoryModel[] =>
        data.map((d) => ({
          ClickHistoryId: ClickHistoryIdParser.brand('ClickHistoryId').parse(d.ClickHistoryId),
          userId: userIdParser.parse(d.userId),
          pos: { x: d.posX, y: d.posY },
          createdAt: d.createAt.getTime(),
          mouseBtn: d.mouseBtn,
        }))
      ),

  save: async (ClickHistory: ClickHistoryModel): Promise<void> => {
    await getPrismaClient().clickHistory.upsert({
      where: { ClickHistoryId: ClickHistory.ClickHistoryId },
      update: {
        userId: ClickHistory.userId,
        mouseBtn: ClickHistory.mouseBtn,
      },
      create: {
        ClickHistoryId: ClickHistory.ClickHistoryId,
        userId: ClickHistory.userId,
        createAt: new Date(ClickHistory.createdAt),
        mouseBtn: ClickHistory.mouseBtn,
        posX: ClickHistory.pos.x,
        posY: ClickHistory.pos.y,
      },
    })
  },
}
