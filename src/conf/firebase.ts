import firebase from 'firebase'
import firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: "AIzaSyA1Qh4jJvamJIvQhqjwAFrJVA84uw7E_HM",
  authDomain: "bamboo-autumn-123412.firebaseapp.com",
  databaseURL: "https://bamboo-autumn-123412.firebaseio.com",
  projectId: "bamboo-autumn-123412",
  storageBucket: "bamboo-autumn-123412.appspot.com",
  messagingSenderId: "175737604441"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseUiApp = new firebaseui.auth.AuthUI(firebase.auth(firebaseApp));