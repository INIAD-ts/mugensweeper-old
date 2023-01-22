import type { z } from 'zod'

type Branded<T extends string> = string & z.BRAND<T>

export type Userid = Branded<'Userid'>
