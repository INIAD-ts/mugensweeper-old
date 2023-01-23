import { userModelUtil } from '../model/UserModel'
import { UserRepository } from '../repository/UserRepository'

export const UserUsecase = {
  register: async (values: { userId: string; displayName: string; photoUrl: string }) => {
    const newUser = userModelUtil.create(values)
    await UserRepository.save(newUser)

    return newUser
  },
  findByUserId: (userId: string) => UserRepository.findByUserId(userId),
}
