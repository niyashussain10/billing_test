// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCd98u8DgeVE7EdTnRL8uG_YQauE9nxVyc",
  authDomain: "billing-996aa.firebaseapp.com",
  projectId: "billing-996aa",
  storageBucket: "billing-996aa.appspot.com", 
  messagingSenderId: "1047526933474",
  appId: "1:1047526933474:web:e7cd2ab4ad50937c99afbb",
  measurementId: "G-LR8GVWW40L"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
