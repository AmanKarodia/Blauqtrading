// firebase.js (modern SDK only)

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// ✅ Correct storage bucket (must be .appspot.com)
const firebaseConfig = {
  apiKey: "AIzaSyDMrWmxVRxqDzUWdTWZAlxToI3REzvk4mQ",
  authDomain: "blauq-trading.firebaseapp.com",
  projectId: "blauq-trading",
  storageBucket: "blauq-trading.firebasestorage.app", // ✅ FIXED
  messagingSenderId: "135424096764",
  appId: "1:135424096764:web:d945bde0294804d3775a79",
  measurementId: "G-3JGGVRE02N"
};

// ✅ Initialize app
const app = initializeApp(firebaseConfig);

// ✅ Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, auth, storage, analytics };