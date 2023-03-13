import type { ClickHistoryModel, MouseBtn } from '$/domain/gaming/model/ClickHistoryModel'
import type { Pos } from '$/domain/gaming/valueObject/Pos'

export type Methods = {
  get: {
    resBody: string
  }
  post: {
    reqBody: { userId: string; mouseBtn: MouseBtn; pos: Pos }
    resBody: ClickHistoryModel[]
  }
}
