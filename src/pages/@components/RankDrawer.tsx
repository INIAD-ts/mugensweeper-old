import { Button, Drawer, Group, ScrollArea, Table } from '@mantine/core'
import { useState } from 'react'

//デモデータ
const DemoData = [
  { rank: 1, name: 'test1', score: 100 },
  { rank: 2, name: 'test2', score: 90 },
  { rank: 3, name: 'test3', score: 80 },
  { rank: 4, name: 'test4', score: 70 },
  { rank: 5, name: 'test5', score: 60 },
  { rank: 6, name: 'test6', score: 50 },
  { rank: 7, name: 'test7', score: 40 },
  { rank: 8, name: 'test8', score: 30 },
  { rank: 9, name: 'test9', score: 20 },
  { rank: 10, name: 'test10', score: 10 },
]

const RankData = DemoData.map((data) => {
  return (
    <tr key={data.rank}>
      <td>{data.rank}</td>
      <td>{data.name}</td>
      <td>{data.score}</td>
    </tr>
  )
})

export const RankDrawer = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="ランキング"
        padding="xl"
        size="xl"
        position="right"
      >
        <ScrollArea.Autosize maxHeight={1000} sx={{ maxWidth: 400 }} mx="auto">
          <Table>
            <thead>
              <tr>
                <th>順位</th>
                <th>ユーザーデータ</th>
                <th>スコア</th>
              </tr>
            </thead>
            <tbody>{RankData}</tbody>
          </Table>
        </ScrollArea.Autosize>
      </Drawer>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group>
    </>
  )
}
