import type { ClickHistoryModel } from '$/konoha/domain/gaming/model/ClickHistoryModel'
import type { MouseBtn } from '@prisma/client'
import type { Pos } from '..'

export type Methods = {
  get: {
    resBody: string
  }
  post: {
    reqBody: { userId: string; mouseBtn: MouseBtn; pos: Pos }
    resBody: ClickHistoryModel[]
  }
}
