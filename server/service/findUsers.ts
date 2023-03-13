export type UserData = { id: number; firstName: string; lastName: string }

export const findUsers = (userList: UserData[], options: { limit: number }) => {
  return userList.slice(0, options.limit)
}
