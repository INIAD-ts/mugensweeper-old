import type { ClickHistoryModel, MouseBtn } from '$/allen/domain/gaming/model/ClickHistoryModel'
import type { Pos } from '$/allen/domain/gaming/valueObject/Pos'

export type Methods = {
  get: {
    resBody: string
  }
  post: {
    reqBody: { userId: string; mouseBtn: MouseBtn; pos: Pos }
    resBody: ClickHistoryModel[]
  }
}
