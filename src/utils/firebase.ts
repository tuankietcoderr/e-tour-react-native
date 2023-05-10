import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCJ7OWS5QLM4a2UDIJLuJrwoiQ76Oe9luI',
  authDomain: 'e-tour-387007.firebaseapp.com',
  projectId: 'e-tour-387007',
  storageBucket: 'e-tour-387007.appspot.com',
  messagingSenderId: '1060824201583',
  appId: '1:1060824201583:web:737998cbf2867e50d6509a',
  measurementId: 'G-ERCB3RRWYR',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
