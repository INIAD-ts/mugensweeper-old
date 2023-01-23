import { UserUsecase } from '$/allen/domain/user/usecase/UserUsecase'
import { z } from 'zod'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: {
    validators: {
      body: z.object({
        userId: z.string().min(5).max(15),
        displayName: z.string().min(5).max(15),
        photoUrl: z.string().url(),
      }),
    },
    handler: async ({ body }) => {
      console.log(1)
      const newUser = await UserUsecase.register(body)
      return { status: 201, body: newUser }
    },
  },
}))
