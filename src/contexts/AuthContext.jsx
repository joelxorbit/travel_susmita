import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, fullName, username, phone) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user profile in Firestore
    await setDoc(doc(db, 'Users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      fullName,
      username,
      email,
      phone,
      storageUsed: 0,
      storageLimit: 10 * 1024 * 1024, // 10MB Free
      plan: 'Free',
      joinedDate: new Date().toISOString(),
      role: 'user'
    });
    return userCredential;
  }

  async function login(email, password) {
    let loginEmail = email.trim().toLowerCase();
    if (loginEmail === 'admin') {
      loginEmail = 'admin@gmail.com';
    }
    try {
      return await signInWithEmailAndPassword(auth, loginEmail, password);
    } catch (error) {
      // Auto-create admin account if it does not exist yet in Firebase Authentication
      if (
        (loginEmail === 'admin@gmail.com' || loginEmail === 'admin@wanderluxe.com') &&
        password === 'admin@123' &&
        (error.code === 'auth/user-not-found' ||
         error.code === 'auth/invalid-credential' ||
         error.code === 'auth/invalid-login-credentials' ||
         error.code === 'auth/wrong-password')
      ) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, password);
          await setDoc(doc(db, 'Users', userCredential.user.uid), {
            uid: userCredential.user.uid,
            fullName: 'Master Admin',
            username: 'admin',
            email: loginEmail,
            phone: '+1 800 WANDERLUXE',
            storageUsed: 0,
            storageLimit: 100 * 1024 * 1024,
            plan: 'Enterprise VIP',
            joinedDate: new Date().toISOString(),
            role: 'admin'
          });
          return userCredential;
        } catch (createErr) {
          throw error;
        }
      }
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'Users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'Users', result.user.uid), {
        uid: result.user.uid,
        fullName: result.user.displayName,
        username: result.user.email.split('@')[0],
        email: result.user.email,
        phone: result.user.phoneNumber || '',
        storageUsed: 0,
        storageLimit: 10 * 1024 * 1024,
        plan: 'Free',
        joinedDate: new Date().toISOString(),
        role: 'user'
      });
    }
    return result;
  }
  
  async function loginWithGithub() {
    const result = await signInWithPopup(auth, githubProvider);
    const userDoc = await getDoc(doc(db, 'Users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'Users', result.user.uid), {
        uid: result.user.uid,
        fullName: result.user.displayName || result.user.email.split('@')[0],
        username: result.user.email.split('@')[0],
        email: result.user.email,
        phone: result.user.phoneNumber || '',
        storageUsed: 0,
        storageLimit: 10 * 1024 * 1024,
        plan: 'Free',
        joinedDate: new Date().toISOString(),
        role: 'user'
      });
    }
    return result;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'Users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (user.email === 'admin@gmail.com' || user.email === 'admin@wanderluxe.com') {
            userData.role = 'admin';
          }
          setCurrentUser({ ...user, ...userData });
        } else {
          const role = (user.email === 'admin@gmail.com' || user.email === 'admin@wanderluxe.com') ? 'admin' : 'user';
          setCurrentUser({ ...user, role });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = Boolean(
    currentUser && (
      currentUser.role === 'admin' ||
      currentUser.email === 'admin@gmail.com' ||
      currentUser.email === 'admin@wanderluxe.com' ||
      currentUser.username === 'admin'
    )
  );

  const value = {
    currentUser,
    isAdmin,
    signup,
    login,
    logout,
    resetPassword,
    loginWithGoogle,
    loginWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
