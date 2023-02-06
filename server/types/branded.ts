import type { z } from 'zod'

type BrandedString<T extends string> = string & z.BRAND<T>
type BrandedNumber<T extends string> = number & z.BRAND<T>

export type UserId = BrandedString<'UserId'>

export type ClickHistoryId = BrandedNumber<'ClickHistoryId'>
