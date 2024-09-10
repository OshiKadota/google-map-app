import { initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

enableIndexedDbPersistence(db)
  .then(() => {
    console.log("Offline persistence enabled");
  })
  .catch((err) => {
    if (err.code === "failed-precondition") {
      // 複数のタブが開いているときにこのエラーが発生することがあります
      console.error("Persistence failed: Multiple tabs open", err);
    } else if (err.code === "unimplemented") {
      // ブラウザがIndexedDBをサポートしていない場合
      console.error("Persistence is not available in this browser", err);
    }
  });

export { db };
