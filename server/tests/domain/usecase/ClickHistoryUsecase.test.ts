import type { Pos } from '$/api/konoha'
import type { ClickHistoryModel } from '$/konoha/domain/gaming/model/ClickHistoryModel'
import { ClickHistoryUseCase } from '$/konoha/domain/gaming/usecase/ClickHistoryUsecase'
import { UserUsecase } from '$/konoha/domain/user/usecase/UserUsecase'
import type { UserId } from '$/types/branded'
import { parseUserId } from '$/types/parseBranded'
import type { MouseBtn } from '@prisma/client'
import { expect, test } from 'vitest'

test('clickBoardをテスト', async () => {
  const userTaro = await UserUsecase.register({
    userId: parseUserId('taro'),
    displayName: '太郎',
    photoUrl: 'http://example.com',
  })
  const userInputList: {
    userId: UserId
    mouseBtn: MouseBtn
    pos: Pos
  }[] = [{ userId: userTaro.userId, mouseBtn: 'left', pos: { x: 1, y: 1 } }]

  const result = await ClickHistoryUseCase.clickBoard(userInputList[0])

  expect(result).toHaveLength(1)
  result.forEach((historyModel) => {
    expect(historyModel).toEqual<ClickHistoryModel>({
      clickHistoryId: historyModel.clickHistoryId,
      userId: userTaro.userId,
      pos: userInputList[0].pos,
      createdAt: historyModel.createdAt,
      mouseBtn: userInputList[0].mouseBtn,
    })
  })
})
