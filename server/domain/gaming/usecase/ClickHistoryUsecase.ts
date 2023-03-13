import { getPrismaClient } from 'service/getPrismaClient'
import type { UserId } from 'types/branded'
import type { ClickHistoryModel, MouseBtn } from '../model/ClickHistoryModel'
import { clickHistoryModelUtil } from '../model/ClickHistoryModel'
import { ClickHistoryRepository } from '../repository/ClickHistoryRepository'
import type { Pos } from '../valueObject/Pos'

export const ClickHistoryUsecase = {
  clickBoard: (values: {
    userId: UserId
    mouseBtn: MouseBtn
    pos: Pos
  }): Promise<ClickHistoryModel | null> =>
    getPrismaClient().$transaction(async () => {
      const models = await ClickHistoryRepository.findAll()
      //歴史を作成している
      const result = clickHistoryModelUtil.createIfUnique(
        {
          userId: values.userId,
          pos: values.pos,
          mouseBtn: values.mouseBtn,
        },
        models
      )

      if (result.result === 'success') {
        await ClickHistoryRepository.save(result.model)
        return result.model
      }
      //Repository = database

      return null
    }),
}
