import { Space } from '@mantine/core'
import { useAtom } from 'jotai'
import { BasicHeader } from 'src/components/organisms/BasicHeader'
import { DemoModal } from 'src/pages/@components/modal'
import { userAtom } from '../atoms/user'
import { DemoGrid } from './@components/DemoGrid'

const Home = () => {
  const [user] = useAtom(userAtom)

  return (
    user && (
      <>
        <BasicHeader user={user} />
        <Space h={48} />
        <DemoModal />
        <DemoGrid />
      </>
    )
  )
}

export default Home
