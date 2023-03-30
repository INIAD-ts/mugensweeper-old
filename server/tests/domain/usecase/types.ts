import type { Pos } from '$/domain/gaming/valueObject/Pos'
import type { TriedEmbedId, UserId } from '$/types/branded'
import type { MouseBtn } from '@prisma/client'

export type ClickedCell = {
  type: 'clicked'
  userId: UserId
  mouseBtn: 'left' | 'right'
  index: number
}

export type EmbedCell = { type: 'embed'; index: number }

export type Board = (0 | ClickedCell | EmbedCell)[][]
export type UserInput = {
  userId: UserId
  mouseBtn: MouseBtn
  pos: Pos
}

export type CreationParams = { triedEmbedId: number; pos: Pos; hasBomb: boolean }

export type TriedEmbedModel = {
  triedEmbedId: TriedEmbedId
  pos: Pos
  hasBomb: boolean
  createdAt: number
}
