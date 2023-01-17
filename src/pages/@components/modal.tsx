import { Button, Group, Modal } from '@mantine/core'
import { useState } from 'react'

export function DemoModal() {
  const [opened, setOpened] = useState(true)

  return (
    <>
      <Modal
        //本番では、初回だけ表示するようにする
        opened={opened}
        onClose={() => setOpened(false)}
        title="MugenSweeperについて"
        overflow="inside"
      >
        無限に広がるマインスイーパーです。
        <br />
        ランキングで、スコアを競い合いましょう。
        <br />
        ただし、爆弾のセルを開くとゲームオーバー。スコアが0になります。
        <br />
        <Button 
        //スペースを開けて中央揃いにする
        style={{margin: '0 auto', display: 'block'}}
         onClick={() => setOpened(false)}>はじめる</Button>
      </Modal>

      <Group position="center" />
    </>
  )
}
