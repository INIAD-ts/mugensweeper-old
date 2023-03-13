import type { ClickHistoryId, UserId } from '$/types/branded'
import { z } from 'zod'
import type { Pos } from '../valueObject/Pos'

export type MouseBtn = 'left' | 'right'

export type ClickHistoryModel = {
  clickHistoryId: ClickHistoryId
  userId: UserId
  pos: Pos
  createdAt: number
  mouseBtn: MouseBtn
}

type CreationParams = { clickHistoryId: number; userId: string; pos: Pos; mouseBtn: MouseBtn }

export const clickHistoryModelUtil = {
  create: (values: { clickHistoryId: number; userId: string; pos: Pos; mouseBtn: MouseBtn }) => {
    const newClickHistory: ClickHistoryModel = {
      clickHistoryId: z.number().int().brand('ClickHistoryId').parse(values.clickHistoryId),
      userId: z.string().brand('UserId').parse(values.userId),
      pos: values.pos,
      createdAt: Date.now(),
      mouseBtn: values.mouseBtn,
    }

    return newClickHistory
  },
  createIfUnique: (
    params: Omit<CreationParams, 'clickHistoryId'>,
    models: ClickHistoryModel[]
  ): { result: 'success'; model: ClickHistoryModel } | { result: 'faillure'; model: null } => {
    const IsUniquePos = models.every(
      (model) => model.pos.x !== params.pos.x && model.pos.y !== params.pos.y
    )
    return IsUniquePos
      ? {
          result: 'success',
          model: clickHistoryModelUtil.create({ ...params, clickHistoryId: models.length + 1 }),
        }
      : { result: 'faillure', model: null }
  },
}
