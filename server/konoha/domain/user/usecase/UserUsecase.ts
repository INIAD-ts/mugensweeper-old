import { UserRepository } from '../model/repository/UserRepository'
import { userModelUtil } from '../model/UserModel'

export const UserUsecase = {
  register: async (values: { userId: string; displayName: string; photoUrl: string }) => {
    const newUser = userModelUtil.create(values)
    await UserRepository.save(newUser)

    return newUser
  },
}
