import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "todoapp-6940c.firebaseapp.com",
    projectId: "todoapp-6940c",
    storageBucket: "todoapp-6940c.appspot.com",
    messagingSenderId: "93211205865",
    appId: "1:93211205865:web:4026e21de1dc52fa80d078"
};

//init
firebase.initializeApp(firebaseConfig)

//services
const serviceFirestore = firebase.firestore()
const serviceAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { serviceFirestore, serviceAuth, timestamp }