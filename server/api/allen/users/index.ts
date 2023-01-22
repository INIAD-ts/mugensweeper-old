import type { UserModel } from '$/allen/domain/user/model/UserModel'

export type Methods = {
  get: {
    resBody: string
  }

  post: {
    reqBody: {
      userid: string
      displayName: string
      photoUrl: string
    }
    resBody: UserModel
  }
}
