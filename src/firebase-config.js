import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD_8_OtrxO-YZE1LuBzvWYOkox3WzJUiTI",
  authDomain: "addto-97f2f.firebaseapp.com",
  projectId: "addto-97f2f",
  storageBucket: "addto-97f2f.appspot.com",
  messagingSenderId: "306878397873",
  appId: "1:306878397873:web:058501cfc2aeae6431d190",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
