import { returnArray } from '$/service/returnArray'
import { expect, test } from 'vitest'

test('配列を返すテスト', () => {
  const result = returnArray()
  expect(result).toEqual([
    [0, 0],
    [0, 0],
  ])
})
