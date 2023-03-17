import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth'
import { createAuth } from 'src/utils/firebase'
import { returnNull } from './returnNull'

export const loginWithTwitter = async () => {
  const twProvider = new TwitterAuthProvider()
  twProvider.addScope('read:user')

  await signInWithPopup(createAuth(), twProvider).catch(returnNull)
}

export const logout = async () => {
  await createAuth().signOut()
}
