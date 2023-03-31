import type { ClickHistoryModel } from '$/domain/gaming/model/ClickHistoryModel'
import { ClickHistoryRepository } from '$/domain/gaming/repository/ClickHistoryRepository'
import { TriedEmbedRepository } from '$/domain/gaming/repository/TriedEmbedRepository'
import { GamingUseCase } from '$/domain/gaming/usecase/GamingUsecase'
import { UserUsecase } from '$/domain/user/usecase/UserUsecase'
import {
  createExpectedClickHistories,
  createExpectedTriedEmbeds,
  createUserInputsFromBoard,
  partsToClickedCells,
} from '$/tests/domain/usecase/testUtils'
import type { Board, EmbedCell, TriedEmbedModel, UserInput } from '$/tests/domain/usecase/types'
import { userIdParser } from '$/types/parseBranded'
import { randomUUID } from 'crypto'
import { expect, test } from 'vitest'

const expectToEqualClickHistoryModels = (
  result: ClickHistoryModel[],
  expected: ClickHistoryModel[]
) => {
  expect(result).toHaveLength(expected.length)
  result.forEach((historyModel, i) => {
    expect(historyModel).toEqual<ClickHistoryModel>(expected[i])
  })
}
const registerUser = (name: string) =>
  UserUsecase.register({
    userId: userIdParser.parse(randomUUID()),
    displayName: name,
    photoUrl: 'http://example.com',
  })

const expectToContainEqualTriedEmbedsModel = (
  result: TriedEmbedModel[],
  expected: TriedEmbedModel[]
) => {
  expect(result).toHaveLength(expected.length)
  expected.forEach((expectedModel, i) => {
    expect(result).toContainEqual(expectedModel)
  })
}

test('クリックした履歴を取得できるかのテスト', async () => {
  //前提条件として悪意の攻撃と正当なリクエスト
  const userTaro = await registerUser('太郎')
  const [A, C] = partsToClickedCells([
    {
      userId: userTaro.userId,
      mouseBtn: 'left',
    },
    {
      userId: userTaro.userId,
      mouseBtn: 'left',
    },
  ])
  const B: EmbedCell = {
    type: 'embed',
    index: 0,
  }

  //prettier-ignore
  const board: Board = [
    [0, 0, B, B, B],
    [0, 0, B, C, B],
    [B, B, B, B, B],
    [B, A, B, 0, 0],
    [B, B, B, 0, 0],
  ]

  const userInputs = createUserInputsFromBoard(board)
  //上の中から正当なのを入れる。バグなどを防ぐための綺麗なやつ
  const expectedClickHistories = createExpectedClickHistories(board)
  const expectTriedEmbeds: TriedEmbedModel[] = createExpectedTriedEmbeds(board)

  for (const input of userInputs) {
    await GamingUseCase.clickBoard(input)
  }

  const result1 = await ClickHistoryRepository.findAll()
  const result2 = await TriedEmbedRepository.findAll()
  expectToEqualClickHistoryModels(result1, expectedClickHistories)
  expectToContainEqualTriedEmbedsModel(result2, expectTriedEmbeds)
})

test('同じところタッチした時に結果をdatabaseに送らない', async () => {
  //前提条件として悪意の攻撃と正当なリクエスト
  const [userTaro, userHanako] = await Promise.all([registerUser('花子'), registerUser('太郎')])
  const userInputList: UserInput[] = [
    { userId: userTaro.userId, mouseBtn: 'left', pos: { x: 1, y: 1 } },
    { userId: userTaro.userId, mouseBtn: 'left', pos: { x: 3, y: 2 } },
    { userId: userHanako.userId, mouseBtn: 'left', pos: { x: 1, y: 1 } },
  ]
  //上の中から正当なのを入れる。バグなどを防ぐための綺麗なやつ
  const expectedModels: ClickHistoryModel[] = [
    {
      ClickHistoryId: expect.any(Number),
      userId: userTaro.userId,
      pos: userInputList[0].pos,
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[0].mouseBtn,
    },
    {
      ClickHistoryId: expect.any(Number),
      userId: userTaro.userId,
      pos: userInputList[1].pos,
      createdAt: expect.any(Number),
      mouseBtn: userInputList[1].mouseBtn,
    },
  ]

  //実行
  for (const input of userInputList) {
    await GamingUseCase.clickBoard(input)
  }

  const result = await ClickHistoryRepository.findAll()
  //検証
  expectToEqualClickHistoryModels(result, expectedModels)
})
