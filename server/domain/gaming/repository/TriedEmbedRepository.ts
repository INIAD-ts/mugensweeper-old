import { getPrismaClient } from '$/service/getPrismaClient'
import type { TriedEmbedModel } from '$/tests/domain/usecase/types'
import { triedEmbedIdParser } from '$/types/parseBranded'

export const TriedEmbedRepository = {
  findAll: () =>
    getPrismaClient()
      .triedEmbed.findMany({ orderBy: { id: 'asc' } })
      .then((data): TriedEmbedModel[] =>
        data.map((d) => ({
          triedEmbedId: triedEmbedIdParser.parse(d.id),
          pos: { x: d.posX, y: d.posY },
          hasBomb: d.hasBomb,
          createdAt: d.createdAt.getTime(),
        }))
      ),

  save: async (triedEmbed: TriedEmbedModel): Promise<void> => {
    await getPrismaClient().triedEmbed.upsert({
      where: { id: triedEmbed.triedEmbedId },
      update: {},
      create: {
        id: triedEmbed.triedEmbedId,
        createdAt: new Date(triedEmbed.createdAt),
        posX: triedEmbed.pos.x,
        posY: triedEmbed.pos.y,
        hasBomb: triedEmbed.hasBomb,
      },
    })
  },
}
