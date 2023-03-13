import type { UserId } from '$/types/branded'
import { userIdParser } from '$/types/parseBranded'

export type UserModel = {
  userId: UserId
  displayName: string
  photoUrl: string
}

export const userModelUtil = {
  create: (values: { userId: string; displayName: string; photoUrl: string }): UserModel => {
    {
      const newUser: UserModel = {
        //userIdをUserId型に買える
        userId: userIdParser.parse(values.userId),
        displayName: values.displayName,
        photoUrl: values.photoUrl,
      }
      return newUser
    }
  },
}
