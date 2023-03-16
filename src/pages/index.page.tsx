import { Space } from '@mantine/core'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { BasicHeader } from 'src/components/organisms/BasicHeader'
import { DemoModal } from 'src/pages/@components/modal'
import { userAtom } from '../atoms/user'

const DemoGrid = dynamic(() => import('./@components/DemoGrid').then((mod) => mod.DemoGrid), {
  ssr: false,
})

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
