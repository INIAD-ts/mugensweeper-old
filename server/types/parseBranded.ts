import { z } from 'zod'

export const userIdParser = z.string().brand('UserId')

export const ClickHistoryIdParser = z.number().int().brand('ClickHistoryId')

export const triedEmbedIdParser = z.number().int().brand('TriedEmbedId')
