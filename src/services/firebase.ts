import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBeCXJSChA0dw2B62SPB34qupA1aL_Wvm4",
  authDomain: "ishedule-bd5ac.firebaseapp.com",
  projectId: "ishedule-bd5ac",
  storageBucket: "ishedule-bd5ac.appspot.com",
  messagingSenderId: "1015636851708",
  appId: "1:1015636851708:web:7ccbda8980a39b4fc5d079"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth, firebase } 