import type { UserId } from '$/types/branded'
import { z } from 'zod'

export type UserModel = {
  userId: UserId
  displayName: string
  photoUrl: string
}

export const userModelUtil = {
  create: (values: { userId: string; displayName: string; photoUrl: string }): UserModel => {
    const newUser: UserModel = {
      userId: z.string().brand('UserId').parse(values.userId),
      displayName: values.displayName,
      photoUrl: values.photoUrl,
    }

    return newUser
  },
}
