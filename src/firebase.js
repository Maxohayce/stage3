import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCXThUiVXHYt33zwoel90zdyL0r0i2V9dw",
  authDomain: "dnd-image-gallery-43394.firebaseapp.com",
  projectId: "dnd-image-gallery-43394",
  storageBucket: "dnd-image-gallery-43394.appspot.com",
  messagingSenderId: "49758514233",
  appId: "1:49758514233:web:332b6342c697889a9cb1e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
