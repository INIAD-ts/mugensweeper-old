import type { UserModel } from '$/domain/user/model/UserModel'

export type Methods = {
  get: {
    resBody: string
  }

  post: {
    reqBody: {
      userId: string
      displayName: string
      photoUrl: string
    }
    resBody: UserModel
  }
}
