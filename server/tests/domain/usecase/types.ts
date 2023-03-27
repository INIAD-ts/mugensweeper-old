import type { Pos } from '$/domain/gaming/valueObject/Pos'
import type { UserId } from '$/types/branded'
import type { MouseBtn } from '@prisma/client'

export type ClickedCell = {
  type: 'clicked'
  userId: UserId
  mouseBtn: 'left' | 'right'
  index: number
}

export type EmbedCell = { type: 'embed' }

export type Board = (0 | ClickedCell | EmbedCell)[][]
export type UserInput = {
  userId: UserId
  mouseBtn: MouseBtn
  pos: Pos
}
