import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import React from 'react'

export default function useGoogleSignIn() {
  const [token, setToken] = React.useState<string | null>('')
  async function onGoogleButtonPress() {
    if (auth().currentUser) {
      auth().signOut()
      GoogleSignin.signOut()
    }
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  return { token, onGoogleButtonPress, setToken }
}
