// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMrWmxVRxqDzUWdTWZAlxToI3REzvk4mQ",
  authDomain: "blauq-trading.firebaseapp.com",
  projectId: "blauq-trading",
  storageBucket: "blauq-trading.firebasestorage.app",
  messagingSenderId: "135424096764",
  appId: "1:135424096764:web:d945bde0294804d3775a79",
  measurementId: "G-3JGGVRE02N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore
const db = getFirestore(app);
export { db };