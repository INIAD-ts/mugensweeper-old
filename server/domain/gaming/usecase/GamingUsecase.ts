import { getPrismaClient } from 'service/getPrismaClient'
import type { UserId } from 'types/branded'
import type { ClickHistoryModel, MouseBtn } from '../model/ClickHistoryModel'
import { ClickHistoryModelUtil } from '../model/ClickHistoryModel'
import { triedEmbedModelUtil } from '../model/TriedEmbedModel'
import { ClickHistoryRepository } from '../repository/ClickHistoryRepository'
import { TriedEmbedRepository } from '../repository/TriedEmbedRepository'
import type { Pos } from '../valueObject/Pos'

export const GamingUseCase = {
  clickBoard: (values: {
    userId: UserId
    mouseBtn: MouseBtn
    pos: Pos
  }): Promise<ClickHistoryModel | null> =>
    getPrismaClient().$transaction(async () => {
      const models = await ClickHistoryRepository.findAll()
      //歴史を作成している
      const result = ClickHistoryModelUtil.createIfUnique(
        {
          userId: values.userId,
          pos: values.pos,
          mouseBtn: values.mouseBtn,
        },
        models
      )

      if (result.result === 'success') {
        const existingModels = await TriedEmbedRepository.findAll()
        const triedEmbedModels = triedEmbedModelUtil.createAroundPos(
          result.model.pos,
          existingModels
        )

        await Promise.all([
          ClickHistoryRepository.save(result.model),
          ...triedEmbedModels.map(TriedEmbedRepository.save),
        ])
        return result.model
      }
      //Repository = database

      return null
    }),
}
