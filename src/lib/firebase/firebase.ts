// Import the functions you need from the SDKs you need
import { browser } from '$app/environment';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { deleteApp, getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { onMount } from 'svelte';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIREBASE_APPID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export let firebaseApp: FirebaseApp;
// if (!getApps().length) {
// 	firebaseApp = initializeApp(firebaseConfig);
// } else {
// 	firebaseApp = getApp();
// 	deleteApp(firebaseApp);
// 	firebaseApp = initializeApp(firebaseConfig);
// }

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

let analytics: Analytics;
if (browser) {
	analytics = getAnalytics(firebaseApp);
}

export const auth: Auth = getAuth(firebaseApp);
export const firestore: Firestore = getFirestore(firebaseApp);
export const storage: FirebaseStorage = getStorage(firebaseApp);