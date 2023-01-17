import { Space } from '@mantine/core'
import { useAtom } from 'jotai'
import { BasicHeader } from 'src/components/organisms/BasicHeader'
import { userAtom } from '../atoms/user'
import { DemoModal } from 'src/pages/@components/modal'

const Home = () => {
  const [user] = useAtom(userAtom)

  return (
    user && (
      <>
        <BasicHeader user={user} />
        <Space h={48} />
        <DemoModal />
      </>
    )
  )
}

export default Home
