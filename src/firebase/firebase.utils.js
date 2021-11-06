// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB_ujLRb2uSW3_piLiALlBjl-MYEOABTA",
  authDomain: "crwn-db-828cd.firebaseapp.com",
  projectId: "crwn-db-828cd",
  storageBucket: "crwn-db-828cd.appspot.com",
  messagingSenderId: "336689011927",
  appId: "1:336689011927:web:41b9fb097389ab3a662492",
  measurementId: "G-450KEYV97W"
};

// Initialize Firebases
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = doc(db, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additonalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => signInWithPopup(auth, provider);