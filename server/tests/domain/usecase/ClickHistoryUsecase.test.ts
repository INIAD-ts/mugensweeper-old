import type { ClickHistoryModel } from '$/allen/domain/gaming/model/ClickHistoryModel'
import { ClickHistoryUsecase } from '$/allen/domain/gaming/usecase/ClickHistoryUsecase'
import type { Pos } from '$/allen/domain/gaming/valueObject/Pos'
import { UserUsecase } from '$/allen/domain/user/usecase/UserUsecase'
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

  const result = await ClickHistoryUsecase.clickBoard(userInputList[0])

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
