import type { ClickHistoryModel } from '$/domain/gaming/model/ClickHistoryModel'
import {
  createExpectedClickHistories,
  createUserInputsFromBoard,
  partsToClickedCells,
} from '$/tests/domain/usecase/testUtils'
import type { Board, ClickedCell, EmbedCell } from '$/tests/domain/usecase/types'
import { userIdParser } from '$/types/parseBranded'
import { randomUUID } from 'crypto'
import { expect, test } from 'vitest'

test('createUserInputsFromBoardの結果をテスト', () => {
  //前提条件として悪意の攻撃と正当なリクエスト
  const userTaroId = userIdParser.parse(randomUUID())
  const [A, C]: ClickedCell[] = partsToClickedCells([
    { userId: userTaroId, mouseBtn: 'left' },
    { userId: userTaroId, mouseBtn: 'right' },
  ])
  const B: EmbedCell = {
    type: 'embed',
    index: 0,
  }

  //prettier-ignore
  const board:Board = [
    [0, 0, 0, 0, 0],
    [0, 0, B, B, B],
    [0, 0, B, C, B],
    [B, B, B, B, B],
    [B, A, B, 0, 0],
    [B, B, B, 0, 0],
  ]
  const userInputs = createUserInputsFromBoard(board)
  const clickHistories = createExpectedClickHistories(board)
  const expectedModels: ClickHistoryModel[] = [
    {
      ClickHistoryId: expect.any(Number),
      userId: userTaroId,
      pos: userInputs[0].pos,
      createdAt: expect.any(Number),
      mouseBtn: userInputs[0].mouseBtn,
    },
    {
      ClickHistoryId: expect.any(Number),
      userId: userTaroId,
      pos: userInputs[1].pos,
      createdAt: expect.any(Number),
      mouseBtn: userInputs[1].mouseBtn,
    },
  ]

  expect(clickHistories).toEqual(expectedModels)
})
/*
const expectedList: UserInput[] = [
  { userId: userTaroId, mouseBtn: 'left', pos: { x: 1, y: 1 } },
  { userId: userTaroId, mouseBtn: 'right', pos: { x: 3, y: 3 } },
]

  const userInputList: UserInput[] = [
    { userId: userTaroId, mouseBtn: 'right', pos: { x: 3, y: 1 } },
    { userId: userTaroId, mouseBtn: 'left', pos: { x: 3, y: 3 } },
  ]
  */
/*
  expect(userInputs).toEqual(expectedList)
  //上の中から正当なのを入れる。バグなどを防ぐための綺麗なやつ
  const expectedModels: ClickHistoryModel[] = [
    {
      ClickHistoryId: expect.any(Number),
      userId: userTaroId,
      pos: userInputList[0].pos,
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[0].mouseBtn,
    },
    {
      ClickHistoryId: expect.any(Number),
      userId: userTaroId,
      pos: userInputList[1].pos,
      //jestあいまいな型比較
      createdAt: expect.any(Number),
      mouseBtn: userInputList[1].mouseBtn,
    },
  ]
  expect(userInputs).toEqual(expectedList)

  //上の中から正当なのを入れる。バグなどを防ぐための綺麗なやつ
})
*/
