import type { ClickHistoryModel } from '$/domain/gaming/model/ClickHistoryModel'
import { ClickHistoryRepository } from '$/domain/gaming/repository/ClickHistoryRepository'
import { ClickHistoryUsecase } from '$/domain/gaming/usecase/ClickHistoryUsecase'
import type { Pos } from '$/domain/gaming/valueObject/Pos'
import { UserUsecase } from '$/domain/user/usecase/UserUsecase'
import type { UserId } from '$/types/branded'
import { parseUserId } from '$/types/parseBranded'
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
    userId: parseUserId(randomUUID()),
    displayName: name,
    photoUrl: 'http://example.com',
  })
const expectToequalModels = (result: ClickHistoryModel[], expected: ClickHistoryModel[]) => {
  expect(result).toHaveLength(expected.length)
  result.forEach((historyModel, i) => {
    expect(historyModel).toEqual<ClickHistoryModel>(expected[i])
  })
}

test('クリックした履歴を取得できるかテスト', async () => {
  //前提条件として悪意の攻撃と正当なリクエスト
  const userTaro = await registerUser('太郎')
  const userInputList: userInput = [
    { userId: userTaro.userId, mouseBtn: 'left', pos: { x: 1, y: 1 } },
    { userId: userTaro.userId, mouseBtn: 'left', pos: { x: 3, y: 2 } },
  ]
  //上の中から正当なのを入れる。バグなどを防ぐための綺麗なやつ
  const expectedModels: ClickHistoryModel[] = [
    {
      clickHistoryId: expect.any(Number),
      userId: userTaro.userId,
      pos: userInputList[0].pos,
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[0].mouseBtn,
    },
    {
      clickHistoryId: expect.any(Number),
      userId: userTaro.userId,
      pos: userInputList[1].pos,
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[1].mouseBtn,
    },
  ]

  //実行
  for (const input of userInputList) {
    await ClickHistoryUsecase.clickBoard(input)
  }

  const result = await ClickHistoryRepository.findAll()

  expectToequalModels(result, expectedModels)
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
      clickHistoryId: expect.any(Number),
      userId: userTaro.userId,
      pos: userInputList[0].pos,
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[0].mouseBtn,
    },
    {
      clickHistoryId: expect.any(Number),
      userId: userTaro.userId,
      pos: userInputList[1].pos,
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[1].mouseBtn,
    },
  ]

  //実行
  for (const input of userInputList) {
    await ClickHistoryUsecase.clickBoard(input)
  }

  const result = await ClickHistoryRepository.findAll()
  console.log(result)

  //検証
  expectToequalModels(result, expectedModels)
})
