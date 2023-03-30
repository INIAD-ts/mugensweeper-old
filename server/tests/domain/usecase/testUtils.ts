/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClickHistoryModel } from '$/domain/gaming/model/ClickHistoryModel'
import type { Board, ClickedCell, TriedEmbedModel, UserInput } from '$/tests/domain/usecase/types'
import { expect } from 'vitest'

export const createUserInputsFromBoard = (board: Board): UserInput[] =>
  board
    .flatMap((row, y) =>
      row.flatMap((cell, x) =>
        cell !== 0 && cell.type === 'clicked'
          ? [
              {
                userId: cell.userId,
                mouseBtn: cell.mouseBtn,
                pos: { x, y: board.length - y - 1 },
                index: cell.index,
              },
            ]
          : []
      )
    )
    .sort((a, b) => a.index - b.index)
    .map(({ index, ...input }) => input)

export const partsToClickedCells = (
  parts: Pick<ClickedCell, 'userId' | 'mouseBtn'>[]
): ClickedCell[] => parts.map((cell, index) => ({ type: 'clicked', ...cell, index }))

export const createExpectedClickHistories = (board: Board): ClickHistoryModel[] =>
  board
    .flatMap((row, y) =>
      row.flatMap((cell, x) =>
        cell !== 0 && cell.type === 'clicked'
          ? [
              {
                ClickHistoryId: expect.any(Number),
                userId: cell.userId,
                mouseBtn: cell.mouseBtn,
                pos: { x, y: board.length - y - 1 },
                createdAt: expect.any(Number),
                index: cell.index,
              },
            ]
          : []
      )
    )
    .sort((a, b) => a.index - b.index)
    .map(({ index, ...model }) => model)

const BOMB_PROBABILITYS = 20
const data = () => {
  const a = Math.floor(Math.random() * 100)
  if (a < BOMB_PROBABILITYS) {
    return true
  }
  return false
}

export const createExpectedTriedEmbeds = (board: Board): TriedEmbedModel[] =>
  board
    .flatMap((row, y) =>
      row.flatMap((cell, x) =>
        cell !== 0 && cell.type === 'clicked'
          ? [
              {
                triedEmbedId: expect.any(Number),
                pos: { x, y: board.length - y - 1 },
                hasBomb: data(),
                createdAt: expect.any(Number),
                index: cell.index,
              },
            ]
          : []
      )
    )
    .sort((a, b) => a.index - b.index)
    .map(({ index, ...model }) => model)

export const aroundDirections: (readonly [number, number])[] = [-1, 0, 1]
  .flatMap((x, _, arr) => arr.map((y) => [x, y] as const))
  .filter(([x, y]) => x !== 0 || y !== 0)
