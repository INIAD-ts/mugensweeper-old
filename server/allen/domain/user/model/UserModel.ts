import type { Userid } from '$/types/branded'
import { z } from 'zod'

export type UserModel = {
  userid: Userid
  displayName: string
  photoUrl: string
}

export const userModelUtil = {
  create: (values: { userid: string; displayName: string; photoUrl: string }): UserModel => {
    {
      const newUser: UserModel = {
        //userIdをUserId型に買える
        userid: z.string().brand('Userid').parse(values.userid),
        displayName: values.displayName,
        photoUrl: values.photoUrl,
      }
      return newUser
    }
  },
}
