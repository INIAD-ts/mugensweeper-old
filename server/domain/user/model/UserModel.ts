import type { UserId } from '$/types/branded'
import { z } from 'zod'

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
        userId: z.string().brand('UserId').parse(values.userId),
        displayName: values.displayName,
        photoUrl: values.photoUrl,
      }
      return newUser
    }
  },
}
