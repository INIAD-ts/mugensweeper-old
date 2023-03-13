import type { ClickHistoryId, UserId } from '$/types/branded'
import { ClickHistoryIdParser, userIdParser } from '$/types/parseBranded'
import type { Pos } from '../valueObject/Pos'

export type MouseBtn = 'left' | 'right'

export type ClickHistoryModel = {
  ClickHistoryId: ClickHistoryId
  userId: UserId
  pos: Pos
  createdAt: number
  mouseBtn: MouseBtn
}

type CreationParams = { ClickHistoryId: number; userId: string; pos: Pos; mouseBtn: MouseBtn }

export const ClickHistoryModelUtil = {
  create: (values: { ClickHistoryId: number; userId: string; pos: Pos; mouseBtn: MouseBtn }) => {
    const newClickHistory: ClickHistoryModel = {
      ClickHistoryId: ClickHistoryIdParser.brand('ClickHistoryId').parse(values.ClickHistoryId),
      userId: userIdParser.parse(values.userId),
      pos: values.pos,
      createdAt: Date.now(),
      mouseBtn: values.mouseBtn,
    }

    return newClickHistory
  },
  createIfUnique: (
    params: Omit<CreationParams, 'ClickHistoryId'>,
    models: ClickHistoryModel[]
  ): { result: 'success'; model: ClickHistoryModel } | { result: 'faillure'; model: null } => {
    const IsUniquePos = models.every(
      (model) => model.pos.x !== params.pos.x && model.pos.y !== params.pos.y
    )
    return IsUniquePos
      ? {
          result: 'success',
          model: ClickHistoryModelUtil.create({ ...params, ClickHistoryId: models.length + 1 }),
        }
      : { result: 'faillure', model: null }
  },
}
