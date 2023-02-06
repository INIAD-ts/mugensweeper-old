import { FIREBASE_AUTH_EMULATOR_HOST, FIREBASE_SERVER_KEY } from '$/service/envValues'
import admin from 'firebase-admin'

const notDuplicatedWhenTesting = () => process.env.NODE_ENV === 'test' && admin.apps.length === 0

export const firebaseAdmin = notDuplicatedWhenTesting()
  ? admin.initializeApp(
      FIREBASE_AUTH_EMULATOR_HOST
        ? { projectId: 'emulator' }
        : { credential: admin.credential.cert(JSON.parse(FIREBASE_SERVER_KEY)) }
    )
  : admin

export const getVerifiedUser = async (cookieVal: string | undefined) => {
  const auth = firebaseAdmin.auth()
  const idToken = await auth.verifySessionCookie(cookieVal ?? '', true).catch(() => null)

  return idToken && (await auth.getUser(idToken.uid))
}
