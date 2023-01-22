import { userModelUtil } from '../model/UserModel'
import { UserRepository } from '../repository/UserRepository'

export const UserUsecase = {
  register: async (values: { userid: string; displayName: string; photoUrl: string }) => {
    const newUser = userModelUtil.create(values)
    await UserRepository.save(newUser)

    return newUser
  },
  findByUserid: (userid: string) => UserRepository.findByUserId(userid),
}
