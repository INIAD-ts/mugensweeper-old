import { UserUsecase } from '$/allen/domain/user/usecase/UserUsecase'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params }) => {
    const user = await UserUsecase.findByUserid(params.userId)
    return user ? { status: 200, body: user } : { status: 404 }
  },
}))
