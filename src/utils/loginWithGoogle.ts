import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { createAuth } from 'src/utils/firebase'
import { returnNull } from './returnNull'

export const loginWithGoogle = async () => {
  const ggProvider = new GoogleAuthProvider()
  ggProvider.addScope('read:user')

  await signInWithPopup(createAuth(), ggProvider).catch(returnNull)
}

export const logout = async () => {
  await createAuth().signOut()
}
