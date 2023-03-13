import { z } from 'zod'

export const parseUserId = (userIdString: string) => z.string().brand('UserId').parse(userIdString)
