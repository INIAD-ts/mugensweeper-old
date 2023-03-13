import type { TriedEmbedId } from '$/types/branded'
import { triedEmbedIdParser } from '$/types/parseBranded'
import type { Pos } from '../valueObject/Pos'

export type TriedEmbedModel = {
  triedEmbedId: TriedEmbedId
  pos: Pos
  hasBomb: boolean
  createdAt: number
}

type CreationParams = { triedEmbedId: number; pos: Pos; hasBomb: boolean }

export const aroundDirections: (readonly [number, number])[] = [-1, 0, 1]
  .flatMap((x, _, arr) => arr.map((y) => [x, y] as const))
  .filter(([x, y]) => x !== 0 || y !== 0)

const BOMB_BORN_RATIO = 20
export const triedEmbedModelUtil = {
  create: (params: CreationParams): TriedEmbedModel => ({
    triedEmbedId: triedEmbedIdParser.parse(params.triedEmbedId),
    pos: params.pos,
    hasBomb: params.hasBomb,
    createdAt: Date.now(),
  }),
  createAroundPos: (pos: Pos, allExistingmodels: TriedEmbedModel[]): TriedEmbedModel[] => {
    return aroundDirections
      .map(([x, y], i) =>
        triedEmbedModelUtil.create({
          triedEmbedId: allExistingmodels.length + 1 + i,
          pos: { x: pos.x + x, y: pos.y + y },
          hasBomb: Math.floor(Math.random() * 100) < BOMB_BORN_RATIO,
        })
      )
      .filter((model) =>
        allExistingmodels.every((m) => m.pos.x !== model.pos.x || m.pos.y !== model.pos.y)
      )
  },
}
