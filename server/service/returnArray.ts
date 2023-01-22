export const returnArray = () => {
  return [
    [0, 0],
    [0, 0],
  ]
}

export type BoardState = { y: number; x: number; state: number; user: string }

export const boardMap = (mapstatus: BoardState) => {
  //Pause 必要数だけ(mapobjの上限数)繰り返す処理が必要
  new Map([[[mapstatus.y, mapstatus.x], mapstatus]])
}
