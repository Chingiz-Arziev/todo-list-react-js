import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCrtEBy4qTYKw_pI9-3gy8NKQKfNAJi_pY",
  authDomain: "test-todo-app-ae659.firebaseapp.com",
  databaseURL: "https://test-todo-app-ae659-default-rtdb.firebaseio.com",
  projectId: "test-todo-app-ae659",
  storageBucket: "test-todo-app-ae659.appspot.com",
  messagingSenderId: "235037742939",
  appId: "1:235037742939:web:940348c29f3291ff89ec7e",
  measurementId: "G-SWLMEVJXT4"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
export {db}

const storage = getStorage(app)
export {storage}