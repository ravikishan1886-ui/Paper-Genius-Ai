import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Safely determine if a genuine Firebase configuration exists
export const isFirebaseConfigured = Boolean(
  firebaseConfig &&
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.includes('Dummy') &&
  !firebaseConfig.apiKey.includes('Fake') &&
  !firebaseConfig.apiKey.includes('0000') &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'papergenius-ai-app'
);

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    appInstance = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(appInstance);
    const dbId = (firebaseConfig as any)?.firestoreDatabaseId;
    dbInstance = dbId ? getFirestore(appInstance, dbId) : getFirestore(appInstance);

    // Validate connection asynchronously without crashing app
    getDocFromServer(doc(dbInstance, 'test', 'connection')).catch((err) => {
      console.warn('Firestore initialization notice:', err?.message || 'offline');
    });
  } catch (err: any) {
    console.warn('Firebase initialization skipped or failed:', err?.message);
    appInstance = null;
    authInstance = null;
    dbInstance = null;
  }
}

export const app = appInstance;
export const auth = authInstance;
export const db = dbInstance;
