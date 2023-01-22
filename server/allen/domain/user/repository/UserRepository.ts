import { getPrismaClient } from '$/service/getPrismaClient'
import type { UserModel } from '../model/UserModel'
import { userModelUtil } from '../model/UserModel'

export const UserRepository = {
  save: (user: UserModel): Promise<UserModel> =>
    getPrismaClient()
      .user.upsert({
        where: { userid: user.userid },
        update: {
          userid: user.userid,
          displayName: user.displayName,
          photoUrl: user.photoUrl,
        },
        create: {
          userid: user.userid,
          displayName: user.displayName,
          photoUrl: user.photoUrl,
        },
      })
      .then(userModelUtil.create),
}
