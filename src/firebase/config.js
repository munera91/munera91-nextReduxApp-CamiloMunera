import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDusLz4WTEJpnpuPDo6y_owvfRfucrBMro",
  authDomain: "journal-app-e0dfb.firebaseapp.com",
  projectId: "journal-app-e0dfb",
  storageBucket: "journal-app-e0dfb.appspot.com",
  messagingSenderId: "542004409248",
  appId: "1:542004409248:web:51b53af95d4eadad086ac5"
};

const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp);

export const FirebaseDB = getFirestore( FirebaseApp);