import { getPrismaClient } from '$/service/getPrismaClient'
import type { UserModel } from '../UserModel'
import { userModelUtil } from '../UserModel'
export const UserRepository = {
  save: (user: UserModel): Promise<UserModel> =>
    getPrismaClient()
      .user.upsert({
        where: { userId: user.userId },
        update: {
          userId: user.userId,
          displayName: user.displayName,
          photoUrl: user.photoUrl,
        },
        create: {
          userId: user.userId,
          displayName: user.displayName,
          photoUrl: user.photoUrl,
        },
      })
      .then(userModelUtil.create),
  findByUserId: (userId: string): Promise<UserModel | null> =>
    getPrismaClient()
      .user.findUnique({ where: { userId } })
      .then((user) => user && userModelUtil.create(user)),
}
