import type { UserData } from '$/service/findUsers'
import { findUsers } from '$/service/findUsers'
import { expect, test } from 'vitest'

test('サンプルAPIの関数をテスト', () => {
  const userList: UserData[] = [
    { id: 0, firstName: '太郎', lastName: '山田' },
    { id: 1, firstName: '花子', lastName: '佐藤' },
    { id: 2, firstName: '大揮', lastName: '鈴木' },
    { id: 3, firstName: '雄太', lastName: '山田' },
    { id: 4, firstName: '宏', lastName: '山田' },
    { id: 5, firstName: '裕子', lastName: '佐藤' },
  ]

  const result = findUsers(userList, { lastName: '山田' })
  const result2 = findUsers(userList, { limit: 5 })
  const result3 = findUsers(userList)
  const result4 = findUsers(userList, { limit: 4, lastName: '佐藤' })
  const result5 = findUsers(userList, { limit: 4, lastName: '後藤' })

  const yamadatest: UserData[] = [
    { id: 0, firstName: '太郎', lastName: '山田' },
    { id: 3, firstName: '雄太', lastName: '山田' },
    { id: 4, firstName: '宏', lastName: '山田' },
  ]

  expect(result).toHaveLength(3)
  expect(result).toEqual(expect.arrayContaining(yamadatest))

  expect(result2).toHaveLength(5)
  expect(result2).toEqual(expect.arrayContaining(userList.slice(0, 5)))

  expect(result3).toHaveLength(6)
  expect(result3).toEqual(expect.arrayContaining(userList.slice(0, 6)))

  const satoutest: UserData[] = [
    { id: 1, firstName: '花子', lastName: '佐藤' },
    { id: 5, firstName: '裕子', lastName: '佐藤' },
  ]

  expect(result4).toHaveLength(2)
  expect(result4).toEqual(expect.arrayContaining(satoutest))

  expect(result5).toHaveLength(0)
})
