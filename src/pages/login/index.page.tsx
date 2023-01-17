import { Button, Space } from '@mantine/core'
import { GithubIcon,TwitterIcon } from '@mantine/ds'
import { staticPath } from 'src/utils/$path'
import { loginWithGitHub } from 'src/utils/loginWithGitHub'
import { loginWithGoogle } from 'src/utils/loginWithGoogle'
import { loginWithTwitter } from 'src/utils/loginWithTwitter'

const Login = () => {
  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `center/cover url('${staticPath.images.odaiba_jpg}')`,
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div css={{ fontSize: '80px', fontWeight: 'bold', textShadow: '1px 1px white' }}>
          next-frourio-starter
        </div>
        <Space h={16} />
        <Button
          leftIcon={<GithubIcon size={16} />}
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            },
          })}
          onClick={loginWithGitHub}
        >
          Login with GitHub
        </Button>
        <Button
          leftIcon={<TwitterIcon size={16} />}
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            },
          })}
          onClick={loginWithTwitter}
         >
          Login with Twitter
        </Button>
        <Button
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            },
          })}
          onClick={loginWithGoogle}
         >
          Login with Google
        </Button>
      </div>
    </div>
  )
}

export default Login
