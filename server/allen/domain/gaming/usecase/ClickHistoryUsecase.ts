import type { Pos } from '$/api/allen'
import { getPrismaClient } from '$/service/getPrismaClient'
import type { UserId } from '$/types/branded'
import type { ClickHistoryModel, MouseBtn } from '../model/ClickHistoryModel'
import { clickHistoryModelUtil } from '../model/ClickHistoryModel'
import { ClickHistoryRepository } from '../repository/ClickHistoryRepository'

export const ClickHistoryUsecase = {
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
