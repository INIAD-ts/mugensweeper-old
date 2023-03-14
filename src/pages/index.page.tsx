import { Space } from '@mantine/core'
import { useAtom } from 'jotai'
import { BasicHeader } from 'src/components/organisms/BasicHeader'
import { DemoModal } from 'src/pages/@components/modal'
import { userAtom } from '../atoms/user'
import { DemoGrid } from './@components/grid'
import { RankDrawer } from './@components/RankDrawer'

const Home = () => {
  const [user] = useAtom(userAtom)

  return (
    user && (
      <>
        <BasicHeader user={user} />
        <Space h={48} />
        <DemoModal />
        <RankDrawer />
        <DemoGrid />
      </>
    )
  )
}

export default Home
