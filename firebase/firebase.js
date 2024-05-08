import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCjv5TmrbVJrAU2m0juCV-mcSjdRC48xU",
  authDomain: "expensetracker-74961.firebaseapp.com",
  projectId: "expensetracker-74961",
  storageBucket: "expensetracker-74961.appspot.com",
  messagingSenderId: "756758534673",
  appId: "1:756758534673:web:1f9a8918ccf76fa6bd6fb0",
  measurementId: "G-RCCV1Y11NP"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();