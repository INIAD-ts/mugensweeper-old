import type { ClickHistoryModel } from '$/domain/gaming/model/ClickHistoryModel'
import {
  createExpectedClickHistories,
  createExpectedTriedEmbeds,
  createUserInputsFromBoard,
  partsToClickedCells,
} from '$/tests/domain/usecase/testUtils'
import type { Board, ClickedCell, EmbedCell, TriedEmbedModel } from '$/tests/domain/usecase/types'
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

test('createExpectedTriedEmbed', async () => {
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
  const triedeEmbeds = createExpectedTriedEmbeds(board)
  const expectedModels2: TriedEmbedModel[] = [
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 2, y: 4 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 3, y: 4 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 4, y: 4 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 2, y: 3 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 4, y: 3 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 0, y: 2 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 1, y: 2 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 2, y: 2 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 3, y: 2 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 4, y: 2 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 0, y: 1 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 2, y: 1 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 0, y: 0 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 1, y: 0 },
      createdAt: expect.any(Number),
    },
    {
      triedEmbedId: expect.any(Number),
      hasBomb: expect.any(Boolean),
      pos: { x: 2, y: 0 },
      createdAt: expect.any(Number),
    },
  ]
  expect(triedeEmbeds).toEqual(expectedModels2)
})
