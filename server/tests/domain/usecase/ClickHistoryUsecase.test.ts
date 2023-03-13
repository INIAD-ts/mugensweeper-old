import type { ClickHistoryModel } from '$/domain/gaming/model/ClickHistoryModel'
import type { TriedEmbedModel } from '$/domain/gaming/model/TriedEmbedModel'
import { aroundDirections } from '$/domain/gaming/model/TriedEmbedModel'
import { ClickHistoryRepository } from '$/domain/gaming/repository/ClickHistoryRepository'
import { TriedEmbedRepository } from '$/domain/gaming/repository/TriedEmbedRepository'
import { GamingUseCase } from '$/domain/gaming/usecase/GamingUsecase'
import type { Pos } from '$/domain/gaming/valueObject/Pos'
import { UserUsecase } from '$/domain/user/usecase/UserUsecase'
import type { UserId } from '$/types/branded'
import { userIdParser } from '$/types/parseBranded'
import type { MouseBtn } from '@prisma/client'
import { randomUUID } from 'crypto'
import { expect, test } from 'vitest'

type userInput = {
  userId: UserId
  mouseBtn: MouseBtn
  pos: Pos
}[]

const registerUser = (name: string) =>
  UserUsecase.register({
    userId: userIdParser.parse(randomUUID()),
    displayName: name,
    photoUrl: 'http://example.com',
  })
const expectToEqualClickHistoryModels = (
  result: ClickHistoryModel[],
  expected: ClickHistoryModel[]
) => {
  expect(result).toHaveLength(expected.length)
  result.forEach((historyModel, i) => {
    expect(historyModel).toEqual<ClickHistoryModel>(expected[i])
  })
}

const expectToEqualTriedEmbedModels = (result: TriedEmbedModel[], expected: TriedEmbedModel[]) => {
  expect(result).toHaveLength(expected.length)
  result.forEach((historyModel, i) => {
    expect(historyModel).toEqual<TriedEmbedModel>(expected[i])
  })
}

test('クリックした履歴を取得できるかテスト', async () => {
  //前提条件として悪意の攻撃と正当なリクエスト
  console.log(1)
  const userTaro = await registerUser('太郎')
  console.log(2)
  const userInputList: userInput = [
    { userId: userTaro.userId, mouseBtn: 'left', pos: { x: 1, y: 1 } },
    { userId: userTaro.userId, mouseBtn: 'left', pos: { x: 3, y: 2 } },
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
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[1].mouseBtn,
    },
  ]
  const expectedModels2: TriedEmbedModel[] = [
    ...aroundDirections.map(([x, y]) => ({
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: x + userInputList[0].pos.x, y: y + userInputList[0].pos.y },
      createdAt: expect.any(Number),
    })),
    ...aroundDirections.map(([x, y]) => ({
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: x + userInputList[1].pos.x, y: y + userInputList[1].pos.y },
      createdAt: expect.any(Number),
    })),
  ]

  //実行
  for (const input of userInputList) {
    console.log(3)
    await GamingUseCase.clickBoard(input)
    console.log(4)
  }
  const result1 = await ClickHistoryRepository.findAll()
  const result2 = await TriedEmbedRepository.findAll()

  //検証
  expectToEqualClickHistoryModels(result1, expectedModels)
  expectToEqualTriedEmbedModels(result2, expectedModels2)
})

test('同じところタッチした時に結果をdatabaseに送らない', async () => {
  //前提条件として悪意の攻撃と正当なリクエスト
  const [userTaro, userHanako] = await Promise.all([registerUser('花子'), registerUser('太郎')])
  const userInputList: userInput = [
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
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[1].mouseBtn,
    },
  ]

  //実行
  for (const input of userInputList) {
    await GamingUseCase.clickBoard(input)
  }

  const result = await ClickHistoryRepository.findAll()
  console.log(result)

  //検証
  expectToEqualClickHistoryModels(result, expectedModels)
})
