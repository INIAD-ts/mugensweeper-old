import type { Pos } from '$/api/konoha'
import { getPrismaClient } from '$/service/getPrismaClient'
import type { UserId } from '$/types/branded'
import type { MouseBtn } from '@prisma/client'
import type { ClickHistoryModel } from '../model/ClickHistoryModel'
import { clickHistoryModelUtil } from '../model/ClickHistoryModel'
import { ClickHistoryRepository } from '../repository/ClickHistoryRepository'

export const ClickHistoryUseCase = {
  clickBoard: async (values: {
    userId: UserId
    mouseBtn: MouseBtn
    pos: Pos
  }): Promise<ClickHistoryModel[]> => {
    const allClickHistory = await getPrismaClient().$transaction(async () => {
      const allCount = await ClickHistoryRepository.getAllCount()
      const newClickHistory = clickHistoryModelUtil.create({
        clickHistoryId: allCount + 1,
        userId: values.userId,
        pos: values.pos,
        mouseBtn: values.mouseBtn,
      })
      await ClickHistoryRepository.save(newClickHistory)

      return ClickHistoryRepository.findAll()
    })
    return allClickHistory
  },
}
