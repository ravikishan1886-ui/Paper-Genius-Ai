import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import { GeneratedPaper } from '../types/paper';
import { getSavedPapers, savePaper as saveLocalPaper, deletePaper as deleteLocalPaper } from '../utils/storage';

export interface EducatorUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export interface AuthContextType {
  user: User | EducatorUser | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserPapers: () => Promise<GeneratedPaper[]>;
  saveUserPaper: (paper: GeneratedPaper) => Promise<void>;
  deleteUserPaper: (paperId: string) => Promise<void>;
  savePaperToCloud: (paper: GeneratedPaper) => Promise<void>;
  getCloudPapers: () => Promise<GeneratedPaper[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'papergenius_local_educator_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | EducatorUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const activeAuth = auth;
    const activeDb = db;
    // If genuine Firebase backend is active and configured
    if (isFirebaseConfigured && activeAuth && activeDb) {
      const unsubscribe = onAuthStateChanged(activeAuth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          try {
            const userDocRef = doc(activeDb, 'users', currentUser.uid);
            await setDoc(
              userDocRef,
              {
                id: currentUser.uid,
                email: currentUser.email || '',
                displayName: currentUser.displayName || 'Educator',
                photoURL: currentUser.photoURL || '',
                updatedAt: new Date().toISOString(),
              },
              { merge: true }
            );
          } catch (e) {
            console.warn('Profile sync notice:', e);
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local educator mode (safe offline / preview environment)
      try {
        const stored = localStorage.getItem(LOCAL_USER_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Error reading local educator user', e);
      }
      setLoading(false);
    }
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, pass);
      return;
    }

    // Local account fallback
    const localUser: EducatorUser = {
      uid: 'edu_' + Math.abs(email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)),
      email,
      displayName: email.split('@')[0],
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
    setUser(localUser);
  };

  const signupWithEmail = async (email: string, pass: string, name: string) => {
    if (isFirebaseConfigured && auth && db) {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name && cred.user) {
        await updateProfile(cred.user, { displayName: name });
        const userDocRef = doc(db, 'users', cred.user.uid);
        await setDoc(
          userDocRef,
          {
            id: cred.user.uid,
            email: cred.user.email || '',
            displayName: name,
            createdAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
      return;
    }

    // Local account fallback
    const localUser: EducatorUser = {
      uid: 'edu_' + Date.now(),
      email,
      displayName: name || email.split('@')[0],
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
    setUser(localUser);
  };

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured && auth) {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return;
    }

    // Local fallback for Google login in development preview
    const localUser: EducatorUser = {
      uid: 'edu_google_' + Date.now(),
      email: 'educator@school.edu',
      displayName: 'Google Educator',
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
    setUser(localUser);
  };

  const resetPassword = async (email: string) => {
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
    }
    // In local mode, successfully acknowledge reset request
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
  };

  const fetchUserPapers = async (): Promise<GeneratedPaper[]> => {
    if (isFirebaseConfigured && auth && db && auth.currentUser) {
      try {
        const papersRef = collection(db, 'users', auth.currentUser.uid, 'papers');
        const q = query(papersRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const papers: GeneratedPaper[] = [];
        snapshot.forEach((d) => {
          papers.push(d.data() as GeneratedPaper);
        });
        return papers;
      } catch (err) {
        console.warn('Could not read from Firestore, falling back to local:', err);
      }
    }
    return getSavedPapers();
  };

  const saveUserPaper = async (paper: GeneratedPaper): Promise<void> => {
    saveLocalPaper(paper);
    if (isFirebaseConfigured && auth && db && auth.currentUser) {
      try {
        const paperDocRef = doc(db, 'users', auth.currentUser.uid, 'papers', paper.id);
        await setDoc(paperDocRef, {
          ...paper,
          userId: auth.currentUser.uid,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Could not write to Firestore, paper is kept in local cache:', err);
      }
    }
  };

  const deleteUserPaper = async (paperId: string): Promise<void> => {
    deleteLocalPaper(paperId);
    if (isFirebaseConfigured && auth && db && auth.currentUser) {
      try {
        const paperDocRef = doc(db, 'users', auth.currentUser.uid, 'papers', paperId);
        await deleteDoc(paperDocRef);
      } catch (err) {
        console.warn('Could not delete from Firestore:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseConfigured,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        resetPassword,
        logout,
        fetchUserPapers,
        saveUserPaper,
        deleteUserPaper,
        savePaperToCloud: saveUserPaper,
        getCloudPapers: fetchUserPapers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
