import { Button, Flex, Space } from '@mantine/core'
import { GithubIcon, TwitterIcon } from '@mantine/ds'
import { IconBrandGoogle } from '@tabler/icons'
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
        <Flex
          css={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '0 0 8px rgb(0% 0% 0% / 50%)',
          }}
        >
          mugensweeper
        </Flex>
        <Space h={16} />
        <Button
          leftIcon={<GithubIcon size={16} />}
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            },
            marginBottom: '8px',
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
            marginBottom: '8px',
          })}
          onClick={loginWithTwitter}
        >
          Login with Twitter
        </Button>
        <Button
          leftIcon={<IconBrandGoogle size={16} />}
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            },
            marginBottom: '8px',
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
