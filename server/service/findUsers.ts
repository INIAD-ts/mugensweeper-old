export type UserData = { id: number; firstName: string; lastName: string }
export const findUsers = (
  userList: UserData[],
  options?: { limit?: number; lastName?: string }
) => {
  return userList
    .filter((get) => get.lastName === (options?.lastName ?? get.lastName))
    .slice(0, options?.limit)
}
