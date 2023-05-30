import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDxO0ILrM1DaOa3xy4UZCDlcChMSkdxfdU",
  authDomain: "mindful-me-10baa.firebaseapp.com",
  projectId: "mindful-me-10baa",
  storageBucket: "mindful-me-10baa.appspot.com",
  messagingSenderId: "996367140887",
  appId: "1:996367140887:web:fe05c65bb6e2aa15233452",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
