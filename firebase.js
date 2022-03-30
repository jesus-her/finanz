// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEwIE2KZ9boX_MLJw0_kMZLoFTF17E_8w",
  authDomain: "investmentapp-cf83b.firebaseapp.com",
  projectId: "investmentapp-cf83b",
  storageBucket: "investmentapp-cf83b.appspot.com",
  messagingSenderId: "30657193705",
  appId: "1:30657193705:web:ef2f7d574aed7994a7f278",
  measurementId: "G-FKJ5Y40BED",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const authPure = firebase.auth;
const firestore = firebase.firestore();
const storage = firebase.storage();
const firebase_db = firebase;
const db = firebase.database();
export { auth, firestore, storage, firebase_db, db, authPure };
