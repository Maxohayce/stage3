import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXThUiVXHYt33zwoel90zdyL0r0i2V9dw",
  authDomain: "dnd-image-gallery-43394.firebaseapp.com",
  projectId: "dnd-image-gallery-43394",
  storageBucket: "dnd-image-gallery-43394.appspot.com",
  messagingSenderId: "49758514233",
  appId: "1:49758514233:web:332b6342c697889a9cb1e8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
